import bodyParser from './bodyParser.js';
import uaParser from './uaParser.js';
import { uuid } from './util.js';

const reportPath = /^\/report\/(\d{6})\/?$/;

export default async (ctx, next) => {
	if (ctx.method == 'POST' && reportPath.test(ctx.path)) {
		const matches = ctx.path.match(reportPath);
		const id = matches[1];
		await bodyParser(ctx);
		try {
			ctx.request.body = JSON.parse(ctx.request.body);
			const ua = ctx.get('user-agent');
			const uaInfo = uaParser(ua);
			const data = Object.assign(
				{
					uuid: uuid(),
					ip: ctx.ip,
					cookie: ctx.get('cookie'),
					ua,
					refer: ctx.get('referer'),
					time: +new Date(),
					sid: id,
					uaInfo
				},
				ctx.request.body
			);
			ctx.body = data;
			console.info(data);
		} catch (e) {
			console.error(e);
			ctx.body = e;
		}
	} else {
		next();
	}
};
