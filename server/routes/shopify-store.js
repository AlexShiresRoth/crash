const express = require('express');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const router = express.Router();

router.get('/', (req, res) => {
	fetch('https://ctc-test-app.myshopify.com/admin/api/graphql.json', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Shopify-Access-Token': process.env.SHOPIFY_KEY,
		},
		body: JSON.stringify({
			query: `{
         shop {
           name
           url
           email
           myshopifyDomain
         }
       }`,
		}),
	})
		.then((result) => {
			console.log(result);
			return result.json();
		})
		.then((data) => {
			console.log('data returned:\n', data);
			res.send(data);
		});
});

module.exports = router;
