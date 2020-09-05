import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import Hub from '../main/Hub';

export const Main = () => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 100);
	}, []);
	return (
		<Layout>
			<Hub />
		</Layout>
	);
};
