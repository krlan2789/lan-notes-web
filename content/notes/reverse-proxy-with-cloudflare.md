---
title: "Reverse Proxy with CloudFlare Services"
description: "Using Cloudflare as a reverse proxy: protecting server IPs, handling SSL, and improving caching and security compared to direct DNS."
date: "2025-11-17"
tags: ["cloudflare","nginx","reverse-proxy","vps"]
---

# 1. Reverse Proxy with CloudFlare Services

- Issues:

    - User IP blocked by ISP in some API endpoint.
    - Too many request (HTTP Code 429).

## 1.1. Before using CloudFlare

- Breakdown:

    1. domain.com: DNS -> Server IP (directly).
    2. Server IP: as Public IP (exposed to the internet).
    3. Nginx: as reverse proxy, SSL terminator, and request router.
    4. Web Instance: Web App / API.
    5. Persistence: Database or Storage.

- SSL Management:

    - Create SSL Certificate directly in Server.
    - Add certificate and private key on Server (Nginx).
    - Renewal handle by AutoSSL/Certbot.

- Trade-off:
    - Server IP exposed to public, directly accessed by User.
    - Vulnerable to IP blocks.

## 1.2. After using CloudFlare

- Breakdown:

    1. domain.com: DNS -> CloudFlare IP.
    2. Cloudflare Edge IP: as Public IP (exposed to the internet).
    3. CloudFlare Proxy: a reverse proxy, SSL terminator.
    4. Server IP: receive request from CloudFlare, not directly from User.
    5. Nginx: only receive request from CloudFlare and as request router.
    6. Web Instance: Web App / API.
    7. Persistence: Database or Storage.

- SSL Management:

    - Create SSL Certificate in Cloudflare dashboard.
    - Install the certificate and private key on Server (Nginx).
    - Set SSL mode to Full (Strict) in Cloudflare.
    - Renewal handle by CloudFlare.

- Trade-off:
	- Latency might increase (can resolve by using CloudFlare Edge Caching for static assets).
	- More system configuration and monitoring.

## 1.3. Summary

- Cloudflare hides Server IP, adds DDoS protection, and edge caching.
- Handle SSL Certificate registration and/or renewal.
- Restrict incoming request to server only from Cloudflare.
- Trade-offs:
	- Small latency increase.
	- More configuration/monitoring.

- Table

	| Layer     | Before                          | After                        |
	| --------- | ------------------------------- | ---------------------------- |
	| Public IP | Server IP                       | Cloudflare Edge -> Server IP |
	| SSL       | Nginx Handles (AutoSSL/Certbot) | Cloudflare SSL               |
	| Caching   | Nginx Only                      | Cloudflare Edge IP + Nginx   |
	| Security  | Nginx Rules                     | Cloudflare Firewall          |

- References

	See [this visual workflow](./resources/cloudflare_reverse_proxy.pdf).