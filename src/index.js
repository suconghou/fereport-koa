const Koa = require('koa');
const app = new Koa();
import report from './lib/report.js';

// x-response-time
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);

	const origin = ctx.request.header.origin;
	if (origin) {
		ctx.set('Access-Control-Allow-Origin', origin);
		ctx.set('Access-Control-Allow-Credentials', 'true');
	} else {
		ctx.set('Access-Control-Allow-Origin', '*');
	}

	ctx.set('Access-Control-Max-Age', '604800');
	ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, PATCH, OPTIONS');
	ctx.set('Access-Control-Allow-Headers', 'Range, Origin, X-Requested-With, Content-Type, Content-Length, Accept, Accept-Encoding, Cache-Control, Expires');
	ctx.set('Access-Control-Expose-Headers', 'Content-Length, Accept-Ranges');
});

// logger
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(report);

// response
app.use(async ctx => {
	ctx.body = 'Hello World';
});

app.listen(3000);
