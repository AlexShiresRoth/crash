import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import Store from '../store/Store';

const StorePage = () => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 100);
	}, []);
	return (
		<Layout>
			<Store />
		</Layout>
	);
};

export default StorePage;
