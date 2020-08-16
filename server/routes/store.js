const express = require('express');
const SquareConnect = require('square-connect');
const defaultClient = SquareConnect.ApiClient.instance;
const router = express.Router();
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');
// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = process.env.SQUARE_TOKEN;

//@route GET Route
//@desc Get Store Items
//@access public
router.get('/', async (req, res) => {
	const api = new SquareConnect.CatalogApi();

	let opts = {
		types: 'ITEM,ITEM_VARIATION,MODIFIER,MODIFIER_LIST,CATEGORY,TAX',
	};
	try {
		const response = await api.listCatalog(opts);

		res.json(response);
	} catch (error) {
		console.error(error);

		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route GET Route
//@desc get catalog images
//@access public
router.get('/catalogimages', async (req, res) => {
	const api = new SquareConnect.CatalogApi();

	let options = {
		types: 'IMAGE',
	};

	try {
		const response = await api.listCatalog(options);
		console.log(response);
		res.json(response);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route GET route
//@desc retrieve item categories
//@access public
router.get('/categories', async (req, res) => {
	const api = new SquareConnect.CatalogApi();

	let options = {
		types: 'CATEGORY',
	};

	try {
		const response = await api.listCatalog(options);
		res.json(response);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route POST route
//@desc search catalog
//@access public
router.post('/', [check('searchTerm', 'Please enter a category to search by').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { searchTerm } = req.body;
	console.log(searchTerm);
	const api = new SquareConnect.CatalogApi();

	const body = {
		include_deleted_objects: false,
		include_related_objects: true,
		object_types: ['ITEM', 'ITEM_VARIATION', 'MODIFIER', 'MODIFIER_LIST', 'CATEGORY', 'TAX', 'IMAGE'],
		query: {
			text_query: {
				keywords: [searchTerm],
			},
		},
	};

	try {
		const response = await api.searchCatalogObjects(body);
		console.log(response);
		res.json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route POST route
//@desc retrieve order details
//@access private
router.post(
	'/startorder',
	[
		check('email', 'Please enter your email').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check('address', 'Please enter your address').not().isEmpty(),
		check('zipCode', 'Please enter your zipcode').not().isEmpty(),
		check('name', 'Please enter your name').not().isEmpty(),
		check('city', 'Please enter your city').not().isEmpty(),
		check('country', 'Please enter your country').not().isEmpty(),
		check('state', 'Please enter your state').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, address, zipCode, name, city, country, state } = req.body;

		const apiInstance = new SquareConnect.OrdersApi();

		const locationId = process.env.LOCATION_ID; // String | The ID of the business location to associate the order with.

		const request_body = {
			order: {
				location_id: locationId,
			},
			idempotency_key: crypto.randomBytes(22).toString('hex'),
		};
		const body = new SquareConnect.CreateOrderRequest(request_body); // CreateOrderRequest | An object containing the fields to POST for the request.  See the corresponding object definition for field details.

		try {
			console.log('this is the body', body);
			const response = await apiInstance.createOrder(locationId, body);
			console.log(response, 'DFTGSDFGSDFGSDFGSDGSDFG');
			res.json(response);
		} catch (error) {
			console.error(error, '564356464645645645');
			return res.status(500).json({ msg: error });
		}
	}
);

//@route GET route
//@desc get locations
//@access private
router.get('/locations', async (req, res) => {
	const apiInstance = new SquareConnect.LocationsApi();
	try {
		apiInstance.listLocations().then(
			function (data) {
				console.log('API called successfully. Returned data: ' + data);
				res.json(data);
			},
			function (error) {
				console.error(error);
				res.status(400).json({ msg: error });
			}
		);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});

module.exports = router;
