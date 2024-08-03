# misskey-admin-notify-webhook-for-discord

## What is this

This repository notifies to discord webhook what notice mention to user, abuse report and new user registration from Misskey.

This program working on cloudflare workers.

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
2. Select "Webhook"
3. Click "Create Webhook"
4. Enter each item<br>
   Name: Any text you wish to use<br>
   URL: Disocrd Webhook URL<br>
   Secret: Enter the contents of the SECRET set in Workers
5. Select "Report"
6. Click "Notification setting"
7. Click "Add a recipient for abuse reports"
8. Enter each item<br>
   Title: Any text you wish to use<br>
   Notification type: Webhook
   Webhook to use: Name set in 4

#### Setting up Mention Reply notifications to users

1. Login as the user you wish to receive notifications from.
2. Open settings
3. Select "Webhook"
4. Click "Create Webhook"
5. Enter each item<br>
   Name: Any text you wish to use<br>
   URL: Discord Webhook URL<br>
   Secret: Enter the contents of the SECRET set in Workers<br>
   Trigger: Enable the notifications you want to receive

## Credit

Kabo

https://memo.kabomk.com/misskey-webhook/

[@nakkaa@misskey.7ka.org](https://misskey.7ka.org/@nakkaa)

https://gist.github.com/nakkaa/b304e9319bf1b60d2af574f32b40bc1a

## これはなに

Misskey から、ユーザーへのメンション・リプライ通知、通報、新規ユーザー登録を Webhook を通して Discord へ通知を送るプログラムです。

Cloudflare Workers 上で動きます。

## どうやって使うの

### Workers 側の設定

Workers へこのプログラムをデプロイしてください。

以下の変数名を Workers に登録する必要があります。

- SECRET
- DISCORD

#### SECRET

任意の文字列で問題ありません。

Misskey の Webhook 設定に使用します。

#### DISCORD

Discord の WebhookURL を設定してください。

Webhook についてはこちら

https://support.discord.com/hc/ja/articles/228383668-%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB-Webhooks%E3%81%B8%E3%81%AE%E5%BA%8F%E7%AB%A0

### Misskey 側の設定

#### 通報・新規ユーザー登録の通知設定

1. コントロールパネルを開く
2. 「Webhook」を選択
3. 「Webhook を作成」を押下
4. 各項目を入力<br>
   名前：任意の内容<br>
   URL：Discord の WebhookURL<br>
   シークレット：Workers で設定した SECRET の内容を入力
5. コントロールパネルから「通報」を選択
6. 「通知設定」を押下
7. 「通報の通知先を追加」を押下
8. 以下項目を入力<br>
   タイトル：任意の内容<br>
   通知先の種類：Webhook<br>
   使用する Webhook：4 で設定した名前

#### ユーザーへのメンション・リプライ通知設定

1. 通知を受け取りたいユーザーでログインする
2. 設定を開く
3. 「Webhook」を選択
4. 「Webhook を作成」を押下
5. 各項目を入力<br>
   名前：任意の内容<br>
   URL：Discord の WebhookURL<br>
   シークレット：Workers で設定した SECRET の内容を入力<br>
   トリガー：受け取りたい通知を有効にする

## 謝辞

Kabo

https://memo.kabomk.com/misskey-webhook/

[@nakkaa@misskey.7ka.org](https://misskey.7ka.org/@nakkaa)

https://gist.github.com/nakkaa/b304e9319bf1b60d2af574f32b40bc1a