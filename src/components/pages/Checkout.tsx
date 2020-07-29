import React from 'react';
import Layout from '../layout/Layout';
import CheckoutModule from '../store/checkout/CheckoutModule';

const Checkout = (props: any) => {
	return (
		<Layout>
			<CheckoutModule />
		</Layout>
	);
};

export default Checkout;
