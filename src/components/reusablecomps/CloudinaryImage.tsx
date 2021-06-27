import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/base';

// Import any actions required for transformations.
import { scale } from '@cloudinary/base/actions/resize';
// import { useEffect } from 'react';

type Props = {
	image: any;
};

const CloudinaryImage = ({ image }: Props) => {
	// Render the image in a React component.
	const cld = new Cloudinary({
		cloud: {
			cloudName: 'snackmanproductions',
		},
	});

	// Use the image with public ID, 'sample'.
	const img = cld.image(image.publicId);

	// Scale the image to a width of 400 pixels.
	img.resize(scale().width(800));

	console.log('image!', img);

	return <AdvancedImage cldImg={img} />;
};

export default CloudinaryImage;
