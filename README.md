# misskey-admin-notify-webhook-for-discord

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![workflow](https://github.com/t1nyb0x/misskey-admin-notify-webhook-for-discord/actions/workflows/deploy-cfworkers.yml/badge.svg)

English | [Japanese](./README-ja.md)

## What is this

This repository notifies to discord webhook what notice mention to user, abuse report and new user registration from Misskey.

This program working on cloudflare workers.

![出力例](./md/image.png)

## Usage

### Workers side setting

Deploy this program to Workers.

Variable names must be registered with Workers.

- SECRET
- DISCORD

#### SECRET

Any string will do.

Used for Misskey webhook configuration.

#### DISCORD

Set the Discord WebhookURL.

About Webhook

https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks

### Misskey side setting

#### Notification settings for abuse report and new user registration

1. Open Control Panel
2. Select "Webhook" → "Create Webhook"
3. Enter each item<br>
   Name: Any value can be applied<br>
   URL: Cloudflare Workers Webhook URL<br>
   The URL should be like `https://<appname>.<accountname>-cflabo.workers.dev/`.
   Secret: Enter the contents of the SECRET set in Workers
4. Select "Report" → "Notification setting" → "Add a recipient for abuse reports"
5. Select created webhook from "Webhook to use"

#### Setting up Mention Reply notifications to users

1. Login as the user you wish to receive notifications from.
2. Select "Settings" → "Service integration" "Webhook" → "Create Webhook"
3. Enter each item<br>
   Name: Any value can be applied<br>
   URL: Discord Webhook URL<br>
   Secret: Enter the contents of the SECRET set in Workers<br>
   Trigger: Enable the notifications you want to receive

## Credit

Kabo

https://memo.kabomk.com/misskey-webhook/

[@nakkaa@misskey.7ka.org](https://misskey.7ka.org/@nakkaa)

https://gist.github.com/nakkaa/b304e9319bf1b60d2af574f32b40bc1a
