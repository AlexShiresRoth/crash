const express = require('express');
const SquareConnect = require('square-connect');
const defaultClient = SquareConnect.ApiClient.instance;
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = process.env.SQUARE_TOKEN;

//@route GET Route
//@desc Get Store Items
//@access public
router.get('/', async (req, res) => {
	const api = new SquareConnect.CatalogApi();

	let opts = {
		types: 'ITEM,ITEM_VARIATION,MODIFIER,MODIFIER_LIST,CATEGORY,TAX,IMAGE',
	};
	try {
		const response = await api.listCatalog(opts);

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

module.exports = router;
