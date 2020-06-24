const express = require('express');
const SquareConnect = require('square-connect');
const defaultClient = SquareConnect.ApiClient.instance;
const router = express.Router();

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = process.env.SQUARE_TOKEN;

//@route GET Route
//@desc Get Store Items
//@access public
router.get('/', async (req, res) => {
	const api = new SquareConnect.CatalogApi();

	const body = new SquareConnect.SearchCatalogObjectsRequest();
	let opts = {
		include_related_objects: true,
		types: 'ITEM,ITEM_VARIATION,MODIFIER,MODIFIER_LIST,CATEGORY,TAX,IMAGE',
	};
	try {
		const response = await api.listCatalog(opts);

		const items = response.objects.map((item) => item);
		res.json(items);
	} catch (error) {
		console.error(error);

		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});

module.exports = router;
