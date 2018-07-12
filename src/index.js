const Koa = require('koa');
const app = new Koa();
import report from './lib/report.js';

// x-response-time
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
	ctx.set('Access-Control-Allow-Origin', '*');
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
