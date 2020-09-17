const express = require('express');
const { validationResult, check } = require('express-validator');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const router = express.Router();

mailchimp.setConfig({
	apiKey: process.env.MAIL_CHIMP,
	server: 'us10',
});

//@route GET Route
//@desc make sure everything is chimpy
//@access private
router.get('/mc', async (req, res) => {
	try {
		console.log('hello');
		const response = await mailchimp.ping.get();
		console.log(response);
		res.json(response);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route POST route
//@desc create an audience
//@access private
router.post('/createaudience', async (req, res) => {});

//@route GET route
//@desc get lists
//@access private
router.get('/lists', async (req, res) => {
	try {
		const response = await mailchimp.lists.getAllLists();
		console.log(response);
		res.json(response);
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route GET Route
//@desc get audience members
//@access private
router.get('/audience', async (req, res) => {
	try {
		const response = await mailchimp.lists.getListMembersInfo(process.env.LIST_ID);

		if (!response) {
			return res.status(400).json({ msg: 'Could not find that list' });
		}

		console.log(response);
		res.json(response);
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route POST Route
//@desc send signup email
//@access private
router.put('/signup', [check('email', 'Please enter a valid email').isEmail()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email } = req.body;

	try {
		const response = await mailchimp.lists.addListMember(process.env.LIST_ID, {
			email_address: email,
			status: 'subscribed',
		});
		console.log(response);
		res.json(response);
	} catch (error) {
		console.error(JSON.parse(error.response.text));
		res.status(error.response.status).json({ msg: 'Internal Server Error' });
	}
	//TODO create signup
});

module.exports = router;
