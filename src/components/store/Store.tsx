import React, { useEffect } from 'react';
import style from './Store.module.scss';
import { connect } from 'react-redux';
import { fetchStoreItems } from '../../actions/store';
import LoadingSpinner from '../reusablecomps/LoadingSpinner';
import SearchBar from './search/SearchBar';
import StoreItems from './StoreItems';

interface Props {
	store: {
		catalog: any;
		loading: boolean;
	};
	fetchStoreItems: () => any;
}

const Store = ({ store: { catalog, loading }, fetchStoreItems }: Props) => {
	useEffect(() => {
		fetchStoreItems();
	}, [fetchStoreItems]);

	return !loading ? (
		<section className={style.section}>
			<SearchBar />
			<div className={style.store_grid}>
				<StoreItems catalog={catalog} />
			</div>
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
