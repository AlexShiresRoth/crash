import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import VideosComponent from '../videos/VideosComponent';

const Videos = () => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 100);
	}, []);
	return (
		<Layout>
			<VideosComponent />
		</Layout>
	);
};

export default Videos;
