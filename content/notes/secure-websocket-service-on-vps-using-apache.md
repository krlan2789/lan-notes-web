---
title: "Secure WebSocket Service on VPS using Apache"
description: "A step-by-step guide to deploying a Node.js WebSocket service on a VPS with a subdomain, and using Apache as a reverse proxy."
date: "2024-06-11"
tags: ["node","node.js","websocket","vps","apache"]
---

# Deploying a Secure Node.js WebSocket Service on VPS using Apache

Real-time features are essential for modern web applications, and WebSockets provide a solution for two-way communication between clients and servers. If you want full control and security, hosting your own WebSocket service on a VPS. This note is a guidance, how to deploy a secure Node.js WebSocket server, protect it with SSL, and make it accessible via a custom subdomain using Apache as a reverse proxy.

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

## **Step 3: Prepare Apache for Proxying**

Apache needs to proxy both HTTP and WebSocket traffic to your Node.js app. Enable the necessary modules:

<br/>

```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_wstunnel
```

<br/>

## **Step 4: Configure Apache Virtual Hosts**

To ensure your WebSocket service is accessible securely via HTTPS and properly proxied, you need to create a virtual host configuration for Apache. Follow these steps:

### **Create the Apache Configuration File**

Navigate to the Apache configuration directory and create a new file for your subdomain:

<br/>

```bash
sudo nano /etc/apache2/sites-available/websocket.krlan2789.com.conf
```

<br/>

### **Add Virtual Host Configuration**

In the newly created file, define the virtual host settings to handle SSL, redirect HTTP to HTTPS, and proxy WebSocket connections. Use the following configuration:

<br/>

```apache
<VirtualHost *:80>
    ServerName websocket.krlan2789.com
    Redirect permanent / https://websocket.krlan2789.com
</VirtualHost>

<IfModule mod_ssl.c>
    <VirtualHost *:443>
        ServerName websocket.krlan2789.com

        ProxyPreserveHost On
        RewriteEngine On

        # Upgrade HTTP connections to WebSockets
        RewriteCond %{HTTP:Upgrade} =websocket [NC]
        RewriteRule /(.*) ws://localhost:8765/$1 [P,L]

        # Redirect HTTP to HTTPS
        RewriteCond %{HTTPS} off
        RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

        # Forward all other requests to the Node.js app
        ProxyPass / http://localhost:8765/
        ProxyPassReverse / http://localhost:8765/

        DocumentRoot /root/repositories/WebSocket-Service
        ErrorLog /var/log/apache2/websocket.krlan2789.com-error.log
        CustomLog /var/log/apache2/websocket.krlan2789.com-access.log combined

        SSLEngine On
        SSLCertificateFile /etc/letsencrypt/live/websocket.krlan2789.com/fullchain.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/websocket.krlan2789.com/privkey.pem
    </VirtualHost>
</IfModule>
```

<br/>

### **Enable the Site Configuration**

Once the configuration file is ready, enable it using the following command:

<br/>

```bash
sudo a2ensite websocket.krlan2789.com.conf
```

<br/>

### **Restart Apache**

Finally, restart Apache to apply the changes:

<br/>

```bash
sudo service apache2 restart
# or
sudo systemctl reload apache2
```

<br/>

Your virtual host is now configured to handle secure WebSocket connections and redirect HTTP traffic to HTTPS.

## **Step 5: Test and Enable Your Apache Configuration**

Before applying changes, check for syntax errors:

<br/>

```bash
sudo apache2ctl configtest
```

<br/>

If all is well, enable your new site:

<br/>

```bash
sudo a2ensite websocket.krlan2789.com.conf
```

<br/>

Then restart or reload Apache to apply the changes:

<br/>

```bash
sudo service apache2 restart
# or
sudo systemctl reload apache2
```

<br/>

Check Apache's status to confirm it's running:

<br/>

```bash
systemctl status apache2.service
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

By following these steps, you've set up a secure, WebSocket service on your own VPS, accessible via a custom subdomain and protected with SSL. With Apache handling SSL termination and proxying, and PM2 managing your Node.js process, your real-time application is ready for reliable, secure operation.

See [this note](/secure-websocket-service-on-vps-using-nginx) if you prefer using Nginx instead of Apache.