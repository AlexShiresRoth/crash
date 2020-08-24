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
		console.log(response);
		res.json(response);
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//route POST route
//@desc create lineitem
//@access public
router.post('/addtocart', async (req, res) => {
	try {
		const response = await client.checkout.addLineItems(null, req.body);
		console.log(response);
		res.json(response);
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route POST route
//@desc start a checkout
//@access private
router.post('/startorder', async (req, res) => {
	try {
		const response = await client.checkout.create();
		console.log(JSON.stringify(response));
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

		console.log(JSON.stringify(checkout));

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
		check('email', 'Please enter your email').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check('address', 'Please enter your address').not().isEmpty(),
		check('zipCode', 'Please enter your zipcode').not().isEmpty(),
		check('firstName', 'Please enter your first name').not().isEmpty(),
		check('lastName', 'Please enter your last name').not().isEmpty(),
		check('city', 'Please enter your city').not().isEmpty(),
		check('country', 'Please enter your country').not().isEmpty(),
		check('state', 'Please enter your state').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { address, zipCode, lastName, firstName, city, country, state, checkoutId } = req.body;

		const shippingAddress = {
			address1: address,
			address2: '',
			city,
			company: null,
			country: country,
			firstName,
			lastName,
			phone: '',
			province: state,
			zip: zipCode,
		};
		try {
			console.log(req.body);
			const checkoutResponse = await client.checkout.updateShippingAddress(checkoutId, shippingAddress);
			console.log(JSON.stringify(checkoutResponse));

			res.json(checkoutResponse);
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: 'Internal Server Error' });
		}
	}
);

module.exports = router;
