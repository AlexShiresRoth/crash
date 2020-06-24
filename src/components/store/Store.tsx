import React, { useEffect } from 'react';
import style from './Store.module.scss';
import { connect } from 'react-redux';
import { fetchStoreItems } from '../../actions/store';
import StoreItem from './StoreItem';
import LoadingSpinner from '../reusablecomps/LoadingSpinner';

interface Props {
	store: {
		catalog: Array<any>;
		loading: boolean;
	};
	fetchStoreItems: () => any;
}

const Store = ({ store: { catalog, loading }, fetchStoreItems }: Props) => {
	useEffect(() => {
		fetchStoreItems();
	}, [fetchStoreItems]);

	const storeItems = catalog
		.filter((item) => item.type === 'ITEM')
		.map((item: any, i: number) => {
			return <StoreItem item={item} key={i} index={i} />;
		});

	return !loading ? (
		<section className={style.section}>
			<div className={style.store_grid}>{storeItems}</div>
		</section>
	) : (
		<section className={style.section}>
			<p>Loading...</p>
			<LoadingSpinner />
		</section>
	);
};

const mapStateToProps = (state: any) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, { fetchStoreItems })(Store);
