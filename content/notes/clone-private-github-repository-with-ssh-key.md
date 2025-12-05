---
title: "Clone Private GitHub Repository with SSH Key"
description: "Step-by-step guide to generate an SSH key pair, configure the SSH agent, and authenticate with GitHub for secure private repository access."
date: "2025-12-05"
tags: ["github","repository","ssh","configuration"]
---

# 1. Setup Server to Clone GitHub Private Repository with SSH Key

## 1.1. Scenario Overview

Suppose you want to configure your GitHub account username is `krlan2789`. When creating a SSH Key, we have optional `-C` parameter that better to added as identifier/label, I usually use my GitHub account email for it, let say `root@example.com`, but you can set it whatever you want. We expect 2 generated files, private key `id_mysshkey` and public key `id_mysshkey.pub` in `/root/.ssh/` directory.

## 1.2. Generate SSH Key Pair

Run the following command to create a new SSH key:

```shell
ssh-keygen -t ed25519 -C "root@example.com"
```

When prompted, enter your desired key file path and optional passphrase:

```
Generating public/private ed25519 key pair.
Enter file in which to save the key (/root/.ssh/id_ed25519): id_mysshkey [enter your ssh key file path]
Enter passphrase (empty for no passphrase): [enter your ssh key passphrase/password (optional)]
Enter same passphrase again: [confirm your ssh key passphrase/password]
Your identification has been saved in id_mysshkey
Your public key has been saved in id_mysshkey.pub
The key fingerprint is:
SHA256:abcd1/abcdefghijklmnopqrstuvwxyz0123456789A root@example.com
The key's randomart image is:
+--[ED25519 256]--+
|                 |
|   ___     ___   |
|    O   |   O    |
|        |        |
|        W        |
|    \---^---/    |
|     \_____/     |
|                 |
|                 |
+----[SHA256]-----+
```

## 1.3. Add Private Key to SSH Agent

### 1.3.1. Start SSH Agent

Initialize the SSH agent in your current session:

```shell
eval "$(ssh-agent -s)"
```

If everything looks good as shown below:

```
Agent pid 1234567
```

### 1.3.2. Add SSH Key to Agent

Add your private key to the SSH agent using the full path:

```shell
ssh-add ~/.ssh/id_mysshkey
```

If everything looks good as shown below:

```
Identity added: id_mysshkey (root@example.com)
```

### 1.3.3. Get Your SSH Public Key

Open the generated file named `id_mysshkey.pub` with your text editor or run this command:

```shell
cat ~/.ssh/id_mysshkey.pub
```

If everything looks good as shown below, and copy it for the next steps:

```
ssh-ed25519 AAAAC3ABCDEFGHIJKLMNOPQRSTUVWX/YZ012345678/9abcdefghijklm/nopqrstuvwxyz root@example.com
```

## 1.4. Add SSH Public Key to GitHub

You have two options to add your SSH public key:

### 1.4.1. GitHub Account

- Log in to your GitHub account and go to `Settings`:

  <img style="max-width: 360px; width: 100%; height: auto;" src="./img/clone-private-github-repository-with-ssh-key/account-01.png" />

- On the left side, click `SSH and GPG keys`, then click the `New SSH key` button:

  <img style="max-width: 960px; width: 100%; height: auto;" src="./img/clone-private-github-repository-with-ssh-key/account-02.png" />

- Set the `Title` whatever you want, set the `Key Type` as `Authentication Key`, paste the public key from the previous step in `Key`, and finally click the `Add SSH key` button:

  <img style="max-width: 960px; width: 100%; height: auto;" src="./img/clone-private-github-repository-with-ssh-key/account-03.png" />

### 1.4.2. GitHub Specific Repository

- Go to the GitHub repository you want to clone, click the `Settings` tab. Then on the left side, click `Deploy Keys` and click the `Add deploy key` button:

  <img style="max-width: 960px; width: 100%; height: auto;" src="./img/clone-private-github-repository-with-ssh-key/repository-01.png" />

- Set the `Title` whatever you want, then paste the public key from the previous step in `Key`. I recommend unchecking `Allow write access` if your server only has pull access, then click the `Add key` button:

  <img style="max-width: 960px; width: 100%; height: auto;" src="./img/clone-private-github-repository-with-ssh-key/repository-02.png" />

## 1.5. Verify GitHub Authentication

Test your SSH connection to GitHub by running this command on your server:

```shell
ssh -T git@github.com
```

When prompted, type `yes` and enter:

```
The authenticity of host 'github.com (96.25.12.5)' can't be established.
ED25519 key fingerprint is SHA256:+0123456789abcdefghij/klmnopqrstuvwxyz01234.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])?
Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
Hi krlan2789! You've successfully authenticated, but GitHub does not provide shell access.
```

If everything looks good as shown above, you can now clone private repositories using SSH.

## 1.6. Clone Repository using SSH

Go to your private repository, click the `Code` button, select `SSH`, and copy the URL:

  <img style="max-width: 960px; width: 100%; height: auto;" src="./img/clone-private-github-repository-with-ssh-key/cloning-01.png" />

Then on your server, let's say you want to clone the repository into the `/var/repositories` directory:

```shell
cd /var/repositories
git clone git@github.com:krlan2789/micro-ws-app.git
```

Finally, you've successfully cloned the private repository.
