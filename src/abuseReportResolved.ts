import { getUserName } from './utils/getUserName';

export default async function abuseReportResolved(body: any, webhookUrl: string) {
	const targetUserName = await getUserName(body.server, body.body.targetUserId);
	const reporterUserName = await getUserName(body.server, body.body.reporterId);
	const asigneeUserName = await getUserName(body.server, body.body.assigneeId);

	const isOk = await fetch(webhookUrl, {
		body: JSON.stringify({
			embeds: [
				{
					title: '通報を解決しました',
					color: 3359727,
					description: `通報が解決されました。\n### 通報内容\n ${body.body.comment}\n### 通報があったサーバー\n${body.server}`,
					fields: [
						{
							name: '通報されたユーザー',
							value: `[${targetUserName}](${body.server}/users/${body.body.targetUserId})`,
							inline: true,
						},
						{
							name: '通報を行ったユーザー',
							value: `[${reporterUserName}](${body.server}/users/${body.body.reporterId})`,
							inline: true,
						},
						{
							name: '通報を解決したユーザー',
							value: `[${asigneeUserName}](${body.server}/users/${body.body.assigneeId})`,
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
