import React, { useEffect } from 'react';
import style from './Store.module.scss';
import { connect } from 'react-redux';
import { fetchStoreItems, fetchCatalogImages, fetchCategories } from '../../actions/store';
import SearchBar from './search/SearchBar';
import StoreItems from './StoreItems';
import Carousel from './carousel/Carousel';

interface Props {
	store: any;
	fetchStoreItems: () => any;
	fetchCatalogImages: () => any;
	fetchCategories: () => any;
}

const Store = ({ fetchStoreItems, fetchCatalogImages, fetchCategories }: Props) => {
	useEffect(() => {
		fetchStoreItems();
		fetchCatalogImages();
		fetchCategories();
	}, [fetchStoreItems, fetchCatalogImages, fetchCategories]);

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

export default connect(mapStateToProps, { fetchStoreItems, fetchCatalogImages, fetchCategories })(Store);
