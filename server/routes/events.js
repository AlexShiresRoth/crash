const express = require('express');
const axios = require('axios');
const router = express.Router();

// router.get('/', async (req, res) => {
// 	const config = {
// 		headers: {
// 			accept: 'application/json',
// 		},
// 	};
// 	const events = await axios.get(
// 		`https://rest.bandsintown.com/artists/crashthecalm/events?app_id=${process.env.APP_ID}&date=all`,
// 		config
// 	);

// 	const foundEvents = JSON.parse(events);
// 	if (!foundEvents) {
// 		return res.status(400).json({ msg: 'Could not locate events' });
// 	}
// 	try {
// 		console.log(foundEvents);
// 		return res.json(foundEvents);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ msg: 'Internal Server Error' });
// 	}
// });

module.exports = router;
