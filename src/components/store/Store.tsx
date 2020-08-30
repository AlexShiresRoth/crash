import React, { useEffect } from 'react';
import style from './Store.module.scss';
import { connect } from 'react-redux';
import { fetchStoreItems, startOrder, fetchCheckout } from '../../actions/store';
import SearchBar from './search/SearchBar';
import StoreItems from './StoreItems';
import Carousel from './carousel/Carousel';

interface Props {
	store: any;
	fetchStoreItems: () => any;
	startOrder: () => any;
	fetchCheckout: (val: any) => any;
}

const Store = ({ fetchStoreItems, startOrder, fetchCheckout, store: { cart } }: Props) => {
	useEffect(() => {
		fetchStoreItems();
	}, [fetchStoreItems]);
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
		<section className={style.section}>
			<Carousel />
			<SearchBar />
			<div className={style.store_grid}>
				<StoreItems />
			</div>
		</section>
	);
};

const mapStateToProps = (state: any) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, { fetchStoreItems, startOrder, fetchCheckout })(Store);
