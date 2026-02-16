/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import abuseReport from './abuseReport';
import abuseReportResolved from './abuseReportResolved';
import inactiveModeratorsInvitationOnlyChanged from './inactiveModeratorsInvitationOnlyChanged';
import inactiveModeratorsWarning from './inactiveModeratorsWarning';
import mention from './mention';
import userCreated from './userCreated';

export default {
	async fetch(request: Request, env: { SECRET: string | null; DISCORD: string | null }) {
		if (request.headers.get('X-Misskey-Hook-Secret') !== env.SECRET) {
			console.log('wrong secret');
			return new Response('wrong secret');
		}

		if (env.DISCORD === null) return new Response('not found discord webhook url');

		const reqBody = await request.text();
		// console.log(reqBody);
		if (!reqBody) {
			console.log('no body');
			return new Response('no body');
		}

		const body = JSON.parse(reqBody);

		// console.log(body);

		if (body.type === 'userCreated') {
			const isOk = await userCreated(body, env.DISCORD);
			return new Response(isOk ? 'ok' : 'error');
		}

		if (body.type === 'abuseReport') {
			const isOk = await abuseReport(body, env.DISCORD);
			return new Response(isOk ? 'ok' : 'error');
		}

		if (body.type === 'abuseReportResolved') {
			const isOk = await abuseReportResolved(body, env.DISCORD);
			return new Response(isOk ? 'ok' : 'error');
		}

		if (body.type === 'inactiveModeratorsWarning') {
			const isOk = await inactiveModeratorsWarning(body, env.DISCORD);
			return new Response(isOk ? 'ok' : 'error');
		}

		if (body.type === 'inactiveModeratorsInvitationOnlyChanged') {
			const isOk = await inactiveModeratorsInvitationOnlyChanged(body, env.DISCORD);
			return new Response(isOk ? 'ok' : 'error');
		}

		if (body.type === 'mention' || body.type === 'reply') {
			const isOk = await mention(body, env.DISCORD);
			return new Response(isOk ? 'ok' : 'error');
		}

		return new Response('error');
	},
};
