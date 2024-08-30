export default async function abuseReport(body: any, webhookUrl: string) {
	const server = body.server;
	const targetUserId = body.body.targetUserId;
	const text = body.body.comment;
	const reporterUserId = body.body.reporterId;

	const targetUserName = await getUsername(server, targetUserId);
	const reporterUserName = await getUsername(server, reporterUserId);

	const isOk = await fetch(webhookUrl, {
		body: JSON.stringify({
			embeds: [
				{
					title: '通報がありました。',
					color: 15409955,
					fields: [
						{
							name: '通報があったサーバー',
							value: `${server}`,
						},
						{
							name: '通報されたユーザー',
							value: `${targetUserName}(${targetUserId})`,
						},
						{
							name: '通報内容',
							value: `${text}`,
						},
						{
							name: '通報を行ったユーザー',
							value: `${reporterUserName}(${reporterUserId})`,
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

async function getUsername(server: string, userId: string): Promise<string> {
	// set body
	const requestBodySchema = {
		userId: userId,
	};

	const init = {
		body: JSON.stringify(requestBodySchema),
		method: 'POST',
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	};

	const response = await fetch(server + '/api/users/show', init);
	const userData = await response.text();
	const userName = JSON.parse(userData).username;

	return userName;
}
