const express = require('express');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const Client = require('shopify-buy');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const client = Client.buildClient({
	domain: 'crash-the-calm.myshopify.com',
	storefrontAccessToken: 'b8d283306bab2fd1c7009809c880b300',
});

//@route GET Route
//@desc get inventory
//@access public
router.get('/inventory', async (req, res) => {
	try {
		const response = await client.product.fetchAll();

		if (!response) {
			return res.status(400).json({ msg: 'Oops no response!' });
		}

		res.json(response);
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//route POST route
//@desc create lineitem
//@access private
router.post('/addtocart/:id', async (req, res) => {
	const { option } = req.body;

	const lineItem = {
		variantId: option,
		quantity: 1,
	};

	try {
		const response = await client.checkout.addLineItems(req.params.id, lineItem);
		// console.log('this is a response!!!', response.lineItems);
		res.json(response);
	} catch (error) {
		console.error('this is an error' + error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route POST route
//@desc remove lineitem
//@access private
router.post('/removefromcart/:id', async (req, res) => {
	const { id } = req.body;
	const itemsToRemove = [id];

	try {
		const response = await client.checkout.removeLineItems(req.params.id, itemsToRemove);

		res.json(response);
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: JSON.stringify(error.message) });
	}
});

//@route POST route
//@desc start a checkout
//@access private
router.post('/startorder', async (req, res) => {
	try {
		const response = await client.checkout.create();

		if (!response) {
			return res.status(400).json({ msg: 'Could not start order' });
		}
		res.json(response);
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route GET route
//@desc find a checkout process
//@access private
router.get('/findcheckout/:id', async (req, res) => {
	try {
		const checkout = await client.checkout.fetch(req.params.id);
		if (!checkout) {
			return res.status(400).json({ msg: 'Could not locate a checkout process' });
		}

		// console.log('This is a checkout', JSON.stringify(checkout));

		res.json(checkout);
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//route POST route
//@desc add shipping info
//@access private
router.post(
	'/updateaddress',
	[
		check('address1', 'Please enter your address').not().isEmpty(),
		check('zip', 'Please enter your zipcode').not().isEmpty(),
		check('firstName', 'Please enter your first name').not().isEmpty(),
		check('lastName', 'Please enter your last name').not().isEmpty(),
		check('city', 'Please enter your city').not().isEmpty(),
		check('country', 'Please enter your country').not().isEmpty(),
		check('province', 'Please enter your state').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { address1, zip, lastName, firstName, city, country, province, checkoutId } = req.body;

		const shippingAddress = {
			address1,
			address2: '',
			city,
			company: null,
			country: country,
			firstName,
			lastName,
			phone: '',
			province,
			zip,
		};
		try {
			const checkoutResponse = await client.checkout.updateShippingAddress(checkoutId, shippingAddress);
			// console.log(JSON.stringify(checkoutResponse));

			res.json(checkoutResponse);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: 'Internal Server Error' });
		}
	}
);

//@route POST route
//@desc complete checkout and redirect to shopify
//@access private
router.post(
	'/processcheckout/:id',
	[check('email', 'Please enter your email').not().isEmpty(), check('email', 'Please enter a valid email').isEmail()],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email } = req.body;

		const updates = {
			customAttributes: [{ key: 'email', value: email }],
		};
		try {
			const response = await client.checkout.updateAttributes(req.params.id, updates);

			console.log(response);

			res.json(response);
		} catch (error) {
			console.error(error);
			res.status(500).json({ msg: 'Internal Server Error' });
		}
	}
);

module.exports = router;
