export default async function inactiveModeratorsInvitationOnlyChanged(body: any, webhookUrl: string) {
	const isOk = await fetch(webhookUrl, {
		body: JSON.stringify({
			embeds: [
				{
					title: '新規登録が招待制に移行されました',
					color: 15409955,
					description: `### 注意\nモデレーターのアクティブが一定期間なかったため、新規登録が招待制に移行しました。\n新規登録を開放したい場合は管理設定から変更してください。\n### 対象サーバー\n${body.server}`,
				},
			],
		}),
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => res.ok);

	return isOk;
}
