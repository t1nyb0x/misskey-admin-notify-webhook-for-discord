export default async function inactiveModeratorsWarning(body: any, webhookUrl: string) {
	const isOk = await fetch(webhookUrl, {
		body: JSON.stringify({
			embeds: [
				{
					title: 'まもなく新規登録が招待制へ移行します',
					color: 14931798,
					description: `### 注意\nモデレーターのアクティブが一定期間なかったため、まもなく新規登録が招待制へ移行します。\nモデレーターがログインすることで、この自動処理は中止されます。\n### 対象サーバー\n${body.server}`,
				},
			],
		}),
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => res.ok);

	return isOk;
}
