export default async function userCreated(body: any, webhookUrl: string) {
	const server = body.server;
	const name = body.body.username;

	const isOk = await fetch(webhookUrl, {
		body: JSON.stringify({
			embeds: [
				{
					title: '新規ユーザーが登録しました。',
					color: 2326507,
					fields: [
						{
							name: '登録サーバー',
							value: `${server}`,
						},
						{
							name: 'ユーザー名',
							value: `[${name}](${server}/users/${body.body.id})`,
						},
					],
				},
			],
		}),
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => res.ok);

	return isOk;
}
