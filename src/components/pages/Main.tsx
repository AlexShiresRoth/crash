import React, { useEffect } from 'react';
// import { Redirect } from 'react-router';
import Layout from '../layout/Layout';
import Hub from '../main/Hub';

export const Main = () => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 100);
	}, []);
	return (
		// <Redirect to="/devils" />
		<Layout>
			<Hub />
		</Layout>
	);
};
