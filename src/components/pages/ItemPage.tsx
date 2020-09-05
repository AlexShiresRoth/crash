import React, { useEffect } from 'react';
import Layout from '../layout/Layout';
import Item from '../store/item-page/Item';
import { fetchCheckout } from '../../actions/store';
import { connect } from 'react-redux';
import SuggestedItems from '../store/item-page/SuggestedItems';

interface Props {
	fetchCheckout: (id: string) => any;
}

const ItemPage = ({ fetchCheckout }: Props) => {
	useEffect(() => {
		console.log('found order', localStorage.getItem('checkout'));
		const id = localStorage.getItem('checkout') || '';
		fetchCheckout(id);
	}, [fetchCheckout]);
	return (
		<Layout>
			<Item />
			<SuggestedItems />
		</Layout>
	);
};

export default connect(null, { fetchCheckout })(ItemPage);
