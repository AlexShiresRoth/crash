const express = require('express');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const Client = require('shopify-buy');
const router = express.Router();

const client = Client.buildClient({
	domain: 'crash-the-calm.myshopify.com',
	storefrontAccessToken: 'b8d283306bab2fd1c7009809c880b300',
});

router.get('/orders', async (req, res) => {
	try {
		const response = await client.product.fetchAll();

		if (!response) {
			return res.status(400).json({ msg: 'Oops no response!' });
		}
		console.log(response);
		res.json(response);
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

router.get('/', async (req, res) => {
	try {
		const response = await fetch('https://crash-the-calm.myshopify.com/admin/api/2020-07/orders.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Access-Token': process.env.SHOPIFY_SECRET,
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
		});
		console.log(response);
		res.json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

module.exports = router;
