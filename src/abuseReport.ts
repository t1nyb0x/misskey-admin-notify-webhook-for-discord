import { getUserName } from './utils/getUserName';

export default async function abuseReport(body: any, webhookUrl: string) {
	const server = body.server;
	const targetUserId = body.body.targetUserId;
	const text = body.body.comment;
	const reporterUserId = body.body.reporterId;

	const targetUserName = await getUserName(server, targetUserId);
	const reporterUserName = await getUserName(server, reporterUserId);

	const isOk = await fetch(webhookUrl, {
		body: JSON.stringify({
			embeds: [
				{
					title: '通報がありました',
					color: 15409955,
					description: `通報がありました。\n### 通報内容\n ${text}\n### 通報があったサーバー\n${server}`,
					fields: [
						{
							name: '通報されたユーザー',
							value: `[${targetUserName}](${server}/users/${targetUserId})`,
							inline: true,
						},
						{
							name: '通報を行ったユーザー',
							value: `[${reporterUserName}](${server}/users/${reporterUserId})`,
							inline: true,
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
