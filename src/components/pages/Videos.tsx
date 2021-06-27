import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import Layout from '../layout/Layout';
import VideosComponent from '../videos/VideosComponent';

const Videos = () => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 100);
	}, []);
	return (
		// <Redirect to="/devils" />
		<Layout>
			<VideosComponent />
		</Layout>
	);
};

export default Videos;
