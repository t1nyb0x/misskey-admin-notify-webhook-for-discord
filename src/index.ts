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

export default {
	async fetch(request, env) {
	  if (request.headers.get('X-Misskey-Hook-Secret') !== env.SECRET) {
		console.log('wrong secret');
		return new Response('wrong secret');
	  }
  
	  const reqBody = await request.text();
	  console.log(reqBody)
	  if (!reqBody) {
		console.log('no body');
		return new Response('no body');
	  }
  
	  const body = JSON.parse(reqBody);
  
	  //console.log(body)
  
	  if (body.type === 'userCreated'){
		const server = body.server;
		const name = body.body.username;
  
		const ok = await fetch(env.DISCORD, {
		  body: JSON.stringify({
			content: `新規ユーザー登録がありました。\nserver: <${server}>\nname: ${name}\n`,
		  }),
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		}).then((res) => res.ok);
	
		return new Response(ok ? 'ok' : 'error');
	  }
  
	  if (body.type === 'abuseReport'){
		const server = body.server;
		const name = body.body.targetUserId;
		const text = body.body.comment;
  
		const ok = await fetch(env.DISCORD, {
		  body: JSON.stringify({
			content: `通報がありました。\nserver: <${server}>\nname: ${name}\ntext: ${text}\n`,
		  }),
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		}).then((res) => res.ok);
	
		return new Response(ok ? 'ok' : 'error');
	  }
  
	  if (body.type === 'mention' || body.type === 'reply') {
		const server = body.server;
		const name = body.body.note.user.name;
		const text = body.body.note.text;
  
		const ok = await fetch(env.DISCORD, {
		  body: JSON.stringify({
			content: `管理者にメンションがありました。\nserver: <${server}>\nname: ${name}\ntext: ${text}\n`,
		  }),
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		}).then((res) => res.ok);
	
		return new Response(ok ? 'ok' : 'error');
	  }
  
	  return new Response('error');
	},
  };
