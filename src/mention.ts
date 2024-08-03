export default async function mention(body: any, webhookUrl: string) {
	const server = body.server;
	const name = body.body.note.user.name;
	const text = body.body.note.text;

	const isOk = await fetch(webhookUrl, {
		body: JSON.stringify({
			embeds: [
				{
					title: '管理人にメンションがありました。',
					color: 9364310,
					fields: [
						{
							name: 'メンションがあったサーバー',
							value: `${server}`,
						},
						{
							name: 'メンションしたユーザー名',
							value: `${name}`,
						},
						{
							name: '内容',
							value: `${text}`,
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
