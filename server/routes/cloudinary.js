const cloudinary = require('cloudinary').v2;
const express = require('express');
const router = express.Router();

const cloudinaryAuth = cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
	secure: true,
});

router.get('/songbook', async (req, res) => {
	try {
		const response = await cloudinary.api.resources({ max_results: 30, type: 'upload', prefix: 'crash/songbook' });

		const justUrls = response.resources.map((resource) => ({
			url: resource.secure_url,
			publicId: resource.public_id,
		}));

		const sortedUrls = justUrls
			.slice()
			.sort((a, b) =>
				parseFloat(a.url.split('-')[1].split('_')[0]) > parseFloat(b.url.split('-')[1].split('_')[0]) ? 1 : -1
			);

		console.log(sortedUrls);

		res.json(sortedUrls);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
});

console.log('cloudinary auth?', cloudinaryAuth);

module.exports = router;
