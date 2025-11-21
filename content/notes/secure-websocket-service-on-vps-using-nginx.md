---
title: "Secure WebSocket Service on VPS using Nginx"
description: "A step-by-step guide to deploying a Node.js WebSocket service on a VPS with a subdomain, and using Nginx as a reverse proxy."
date: "2025-06-17"
tags: ["node","node.js","websocket","vps","nginx"]
---

# Deploying a Secure Node.js WebSocket Service on VPS using Nginx

Real-time features are essential for modern web applications, and WebSockets provide a solution for two-way communication between clients and servers. If you want full control and security, hosting your own WebSocket service on a VPS. This note is a guidance, how to deploy a secure Node.js WebSocket server, protect it with SSL, and make it accessible via a custom subdomain using Nginx as a reverse proxy.

## **Scenario Overview**

Suppose you want to serve your WebSocket application at `websocket.krlan2789.com`, hosted on a VPS with the IP address `10.0.27.89`. Your Node.js project location at `/root/repositories/WebSocket-Service`.

## **Step 1: Point Your Subdomain to the VPS**

Start by configuring DNS so your subdomain directs traffic to your VPS. In your DNS provider's dashboard, create an A record:

<br/>

| Type | Name      | Points to  | TTL   |
| ---- | --------- | ---------- | ----- |
| A    | websocket | 10.0.27.89 | 14400 |

<br/>

This ensures that requests to `websocket.krlan2789.com` reach your server.

## **Step 2: Secure the Service with SSL**

Security is crucial for WebSocket connections. Use Certbot to obtain a free SSL certificate from Let's Encrypt. The `--webroot` method verifies your domain by placing a file in your web directory:

<br/>

```bash
sudo certbot certonly --webroot -w /root/repositories/WebSocket-Service -d websocket.krlan2789.com
```

<br/>

## **Step 3: Prepare Nginx for Proxying**

Nginx needs to proxy both HTTP and WebSocket traffic to your Node.js app. Ensure Nginx is installed and the necessary configurations are enabled.

## **Step 4: Configure Nginx**

To ensure your WebSocket service is accessible securely via HTTPS and properly proxied, you need to create a configuration file for Nginx. Follow these steps:

### **Create the Nginx Configuration File**

Navigate to the Nginx configuration directory and create a new file for your subdomain:

<br/>

```bash
sudo nano /etc/nginx/sites-available/websocket.krlan2789.com
```

<br/>

### **Add Server Block Configuration**

In the newly created file, define the server block settings to handle SSL, redirect HTTP to HTTPS, and proxy WebSocket connections. Use the following configuration:

<br/>

```nginx
server {
    listen 80;
    server_name websocket.krlan2789.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name websocket.krlan2789.com;

    ssl_certificate /etc/letsencrypt/live/websocket.krlan2789.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/websocket.krlan2789.com/privkey.pem;

    location / {
        proxy_pass http://localhost:8765;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    error_log /var/log/nginx/websocket.krlan2789.com-error.log;
    access_log /var/log/nginx/websocket.krlan2789.com-access.log;
}
```

<br/>

### **Enable the Site Configuration**

Once the configuration file is ready, create a symbolic link to enable it:

<br/>

```bash
sudo ln -s /etc/nginx/sites-available/websocket.krlan2789.com /etc/nginx/sites-enabled/
```

<br/>

### **Restart Nginx**

Finally, restart Nginx to apply the changes:

<br/>

```bash
sudo service nginx restart
# or
sudo systemctl reload nginx
```

<br/>

Your server block is now configured to handle secure WebSocket connections and redirect HTTP traffic to HTTPS.

## **Step 5: Test and Enable Your Nginx Configuration**

Before applying changes, check for syntax errors:

<br/>

```bash
sudo nginx -t
```

<br/>

If all is well, restart or reload Nginx to apply the changes:

<br/>

```bash
sudo service nginx restart
# or
sudo systemctl reload nginx
```

<br/>

Check Nginx's status to confirm it's running:

<br/>

```bash
systemctl status nginx.service
```

<br/>

## **Step 6: Run Your Node.js WebSocket App with PM2**

To keep your WebSocket server running reliably, use PM2:

<br/>

```bash
npm i -g pm2

# Start the app
pm2 start /root/repositories/WebSocket-Service/app.js --name 'Websocket-Service-App' --watch

# Stop the app
pm2 stop 'Websocket-Service-App'
# Or by index
pm2 stop 0

# Save the process list and set up PM2 to start on boot
pm2 save -f
pm2 startup systemd
```

<br/>

## **Conclusion**

By following these steps, you've set up a secure, WebSocket service on your own VPS, accessible via a custom subdomain and protected with SSL. With Nginx handling SSL termination and proxying, and PM2 managing your Node.js process, your real-time application is ready for reliable, secure operation.

See [this note](/secure-websocket-service-on-vps-using-apache) if you prefer using Apache instead of Nginx.