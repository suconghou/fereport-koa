import bodyParser from './bodyParser.js';
import uaParser from './uaParser.js';

const reportPath = /^\/report\/(\d{6})\/?$/;

export default async (ctx, next) => {
	if (ctx.method == 'POST' && reportPath.test(ctx.path)) {
		const matches = ctx.path.match(reportPath);
		const id = matches[1];
		await bodyParser(ctx);
		try {
			ctx.request.body = JSON.parse(ctx.request.body);
			const data = Object.assign(
				{
					ip: ctx.ip,
					refer: ctx.get('referer'),
					time: +new Date(),
					siteId: id
				},
				ctx.request.body
			);
			uaParser(ctx.request.body.ua);
			ctx.body = '';
			console.info(id, data);
		} catch (e) {
			ctx.body = e;
		}
	} else {
		next();
	}
};
