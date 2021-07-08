import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import CheckoutModule from '../store/checkout/CheckoutModule';

const Checkout = () => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 100);
	}, []);
	return (
		<Layout>
			<CheckoutModule />
		</Layout>
	);
};

export default Checkout;
