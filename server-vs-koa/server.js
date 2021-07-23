require('es6-promise').polyfill();
require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
dotenv.config();
const app = new Koa();
const PORT = process.env.PORT || 8000;
const dev = process.env.NODE_ENV !== 'production';
const { SHOPIFY_SECRET, SHOPIFY_KEY } = process.env;

app.use(session({ secure: true, sameSite: 'none' }, app));

app.use(
	createShopifyAuth({
		apiKey: process.env.SHOPIFY_KEY,
		secret: process.env.SHOPIFY_SECRET,
		scopes: ['read_products'],
		afterAuth(ctx) {
			const { shop, accessToken } = ctx.session;
			console.log('plebs');
			ctx.redirect('/');
		},
	})
);

app.use(verifyRequest());
app.use(async (ctx) => {
	ctx.respond = false;
	ctx.res.statusCode = 200;
	ctx.body = 'YAY';
	return;
});

app.listen(PORT, () => console.log('API Running on port: ' + PORT));
