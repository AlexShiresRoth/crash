import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStoreItems, startOrder, fetchCheckout } from '../../../actions/store';
import style from './Music.module.scss';
import MusicItems from './MusicItems';

interface Props {
	fetchStoreItems: () => any;
	startOrder: () => any;
	fetchCheckout: (val: any) => any;
}

const Music = ({ fetchCheckout, startOrder, fetchStoreItems }: Props) => {
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
			<div className={style.store_grid}>
				<MusicItems />
			</div>
		</section>
	);
};

export default connect(null, { fetchCheckout, startOrder, fetchStoreItems })(Music);
