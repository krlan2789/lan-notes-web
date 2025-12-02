---
title: "Monitoring Service (Containerization)"
description: "Setup guide for containerized monitoring services using Docker/Podman with Prometheus, Grafana, AlertManager, Node Exporter, and cAdvisor."
date: "2025-12-01"
tags: ["container","docker","podman","compose","prometheus","grafana","alertmanager","node-exporter","cadvisor","monitoring"]
github: "https://github.com/krlan2789/containerized-monitoring-services"
---

# 1. Monitoring Services (Containerization)

## 1.1. Compose Project (Container Manager - Podman/Docker)

### 1.1.1. Configuration

Create a file with name `docker-compose.yml`.

#### 1.1.1.1. Global Configuration

Configuration that can be used by all services.

```yml
networks:
	monitoring_network:
		driver: bridge

volumes:
	grafana_data:
	prometheus_data:
	alertmanager_data:
```

#### 1.1.1.2. Prometheus Service

- Used as a metrics collector, then visualized by Grafana.
- Create alert rules when certain metrics reach specific conditions.

1. Prometheus configuration in `docker-compose.yml`:

	```yml
	services:
		prometheus:
			image: prom/prometheus:v3.7.2
			container_name: prometheus
			deploy:
				resources:
					limits:
						cpus: "0.125"
						memory: "250M"
			networks:
				- monitoring_network
			ports:
				- "9090:9090"
			volumes:
				- ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
				- ./prometheus/alert.rules.yml:/etc/prometheus/alert.rules.yml
				- prometheus_data:/prometheus
			restart: always
	```

2. Prometheus configuration in `prometheus.yml` to get metrics from providers

	```yml
	global:
		scrape_interval: 15s
		evaluation_interval: 15s

	scrape_configs:
		- job_name: 'monitoring_targets'
			static_configs:
				- targets: ['192.168.1.15:8765', 'grafana:3000']

		- job_name: 'node_exporter'
			static_configs:
				- targets: ['node_exporter:9100']
					labels:
						nodename: 'main-server'

		- job_name: 'cadvisor'
			static_configs:
				- targets: ['cadvisor:8080']

	alerting:
		alertmanagers:
			- static_configs:
				- targets: ['alertmanager:9093']

	rule_files:
		- "alert.rules.yml"
	```

3. Prometheus configuration in `alert.rules.yml` for alert rules

	```yml
	groups:
		- name: node_alerts
			rules:
				- alert: High Memory Usage (Instance - Critical)
					expr: node_memory_MemAvailable_bytes{nodename="main-server"} / node_memory_MemTotal_bytes{nodename="main-server"} < 0.1
					for: 10m
					labels:
						severity: critical
					annotations:
						summary: "Low memory on {{ $labels.nodename }}"
						description: "Memory available < 10% for 10 minutes on {{ $labels.instance }}"

				- alert: High Memory Usage (Container - Warning)
					expr: container_memory_usage_bytes{container!="",pod!=""} > 1024000000
					for: 5m
					labels:
						severity: warning
					annotations:
						summary: "High memory usage in container {{ $labels.container }}"
						description: "Container {{ $labels.container }} is using > 1024MB memory for 5 minutes"
	```

#### 1.1.1.3. Alert Manager Service

- Manage alert created by Prometheus.
- Send a message to configured services.

1. Alertmanager configuration in `docker-compose.yml`

	```yml
	services:
		alertmanager:
			image: prom/alertmanager:v0.28.0
			container_name: alertmanager
			deploy:
				resources:
					limits:
						cpus: "0.05"
						memory: "50M"
			networks:
				- monitoring_network
			ports:
				- "9093:9093"
			volumes:
				- ./alertmanager/alertmanager.yml:/etc/alertmanager/alertmanager.yml
				- alertmanager_data:/alertmanager
			restart: always
	```

2. Alertmanager configuration in `alertmanager.yml` for sending alert

	```yml
	global:
		resolve_timeout: 5m
		# Email configuration
		smtp_from: '$SMTP_FROM'
		smtp_smarthost: '$SMTP_HOST'
		smtp_auth_username: '$SMTP_USER'
		smtp_auth_password: '$SMTP_PASS'

	route:
		group_by: ['alertname', 'nodename']
		group_wait: 30s
		group_interval: 5m
		repeat_interval: 1h
		receiver: 'email-team'
		routes:
			- match:
					severity: critical
				receiver: 'telegram-alerts'
			- match:
					severity: warning
				receiver: 'email-team'

		receivers:
			- name: 'email-team'
				email_configs:
					- to: '$ALERT_EMAIL'
						send_resolved: true

			- name: 'telegram-alerts'
				telegram_configs:
					- bot_token: '$TELEGRAM_BOT_TOKEN'
						chat_id: $TELEGRAM_GROUP_CHAT_ID
						message: '{{ template "default" . }}'
						send_resolved: true
	```

#### 1.1.1.4. Grafana Service

- Main monitoring dashboard.
- Visualize some metrics collected by Prometheus.

1. Grafana configuration in `docker-compose.yml`:

	```yml
	services:
		grafana:
			image: grafana/grafana-enterprise:12.2.0
			container_name: grafana
			deploy:
				resources:
					limits:
						cpus: "0.1"
						memory: "250M"
			environment:
				- GF_SECURITY_ADMIN_USER=admin
				- GF_SECURITY_ADMIN_PASSWORD=secret
			networks:
				- monitoring_network
			ports:
				- "3000:3000"
			volumes:
				- grafana_data:/var/lib/grafana
			restart: unless-stopped
	```

#### 1.1.1.5. Node Exporter Service

- Instance's resources usage (CPU, RAM, Network, etc.) provider, then collected by Prometheus and visualized by Grafana.

1. Node Exporter configuration in `docker-compose.yml`:

	```yml
	services:
		node_exporter:
			image: prom/node-exporter:v1.8.2
			container_name: node_exporter
			deploy:
				resources:
					limits:
						cpus: "0.05"
						memory: "50M"
			networks:
				- monitoring_network
			ports:
				- "9100:9100"
			restart: always
	```

#### 1.1.1.6. cAdvisor Service

- Container manager's resources usage (CPU, RAM, Network, etc.) provider, then collected by Prometheus and visualized by Grafana.

1. cAdvisor configuration in `docker-compose.yml`:

	```yml
	services:
		cadvisor:
			image: gcr.io/cadvisor/cadvisor:v0.49.2
			container_name: cadvisor
			deploy:
				resources:
					limits:
						cpus: "0.05"
						memory: "100M"
			networks:
				- monitoring_network
			ports:
				- "8080:8080"
			volumes:
				- /:/rootfs:ro
				- /var/run:/var/run:ro
				- /sys:/sys:ro
				- /sys/fs/cgroup:/sys/fs/cgroup:ro
				# Podman specific mounts
				- /run/podman:/run/podman:ro
				- /var/lib/containers:/var/lib/containers:ro
				# Docker specific mounts
				# - /var/run/docker.sock:/var/run/docker.sock:ro
				# - /var/lib/docker/:/var/lib/docker:ro
			privileged: true
			restart: always
	```

#### 1.1.1.7. Usage

Run the following command on the same directory as `docker-compose.yml` file to start all services in detached mode:

Using Docker:

```bash
docker compose up -d
```

Or, if you are using Podman:

```bash
podman compose up -d
```

### 1.1.2. Configuration Breakdown

#### 1.1.2.1. Global

- `networks:` : set named network (optional)
- `volumes:` : create named volume, that can be reusable when run `docker/podman compose up -d` (optional)

#### 1.1.2.2. Service

- `service: SERVICE_NAME:` : service name running the container/image
- `image: IMAGE_ID:TAG` : use `IMAGE_ID` image and specify tag/version `TAG`
- `container_name: CONTAINER_NAME` : set custom container name (optional)
- `resources: limits:` : set cpus (0.0-1.0) and memory (in bytes) limit (optional)
	- `cpus: "0.25"` : max CPU usage set to 25%
	- `memory: "250M"` : max memory usage set to 250MB
- `environment:` : set environment variable uses in container (optionl)
- `networks:` : use defined network in global configuration (optionl)
- `ports:` : export port from inside container to non-container app
	- `LEFT:RIGHT` : `LEFT` used by non-container app, `RIGHT` port the app running inside container (the values can be difference)
- `volumes:` : create a link between directories/files on the host and within the container (recommended)
- `restart:` : restart policy depend on the stop condition
- `privileged: true` : give extended privileges to the service container

### 1.1.3. Sample

1. Created Containers

	<img style="max-width: 960px; width: 100%; height: auto;" src="./img/krlan2789_containerized-monitoring-services/0.png" />

2. Docker/Podman Stats

	<img style="max-width: 960px; width: 100%; height: auto;" src="./img/krlan2789_containerized-monitoring-services/1.png" />

3. Container CPU and Memory Usage (Provided by Prometheus + cAdvisor)

	<img style="max-width: 960px; width: 100%; height: auto;" src="./img/krlan2789_containerized-monitoring-services/2.png" />

4. Instance Resource Usage (Provided by Prometheus + Node Exporter)

	<img style="max-width: 960px; width: 100%; height: auto;" src="./img/krlan2789_containerized-monitoring-services/3.png" />

5. App Metrics (Provided by Prometheus + WebSocket Service)

	<img style="max-width: 960px; width: 100%; height: auto;" src="./img/krlan2789_containerized-monitoring-services/4.png" />

6. Alert Rules (Provided by Prometheus + Alert Manager)

	<img style="max-width: 960px; width: 100%; height: auto;" src="./img/krlan2789_containerized-monitoring-services/5.png" />
