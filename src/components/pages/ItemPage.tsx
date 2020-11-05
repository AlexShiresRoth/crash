import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import Item from '../store/item-page/Item';
import { fetchCheckout, startOrder } from '../../actions/store';
import { connect } from 'react-redux';
import SuggestedItems from '../store/item-page/SuggestedItems';

interface Props {
	fetchCheckout: (id: string) => any;
	startOrder: () => any;
}

const ItemPage = ({ fetchCheckout, startOrder }: Props) => {
	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 100);
	}, []);
	useEffect(() => {
		//if a checkout has not been completed update current
		if (!localStorage.getItem('checkout')) {
			console.log('new order');
			startOrder();
		} else {
			console.log('found order', localStorage.getItem('checkout'));
			const id = localStorage.getItem('checkout') || '';
			fetchCheckout(id);
		}
	}, [startOrder, fetchCheckout]);
	return (
		<Layout>
			<Item />
			<SuggestedItems />
		</Layout>
	);
};

export default connect(null, { fetchCheckout, startOrder })(ItemPage);
