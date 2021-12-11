const cloudinary = require("cloudinary").v2;
const express = require("express");
const router = express.Router();

const cloudinaryAuth = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

router.get("/songbook", async (req, res) => {
  console.log("hello");
  try {
    const response = await cloudinary.api.resources({
      max_results: 22,
      type: "upload",
      prefix: "crash/songbook",
    });

    const justUrls = response.resources.map((resource) => ({
      url: resource.secure_url,
      publicId: resource.public_id,
    }));

    //sort the pages by url,  page number is in the url
    const sortedUrls = justUrls
      .slice()
      .sort((a, b) =>
        parseFloat(a.url.split("page")[1]) > parseFloat(b.url.split("page")[1])
          ? 1
          : -1
      );

    const transformedImgs = sortedUrls.map((img) => {
      const transform = cloudinary.image(img.publicId, {
        transformation: { width: 700, quality: 50 },
      });
      //   console.log(transform.split("'")[1]);
      return transform.split("'")[1];
    });
    console.log(transformedImgs);

    res.json(transformedImgs);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

console.log("cloudinary auth?", cloudinaryAuth);

module.exports = router;
