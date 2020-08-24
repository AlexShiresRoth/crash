import React from 'react';
import StoreItem from './StoreItem';
import { connect } from 'react-redux';
import LoadingSpinner from '../reusablecomps/LoadingSpinner';

interface Props {
	store?: any;
}

const StoreItems = ({ store: { catalog, loading, categories, searchResults } }: Props) => {
	const handleCatalog = catalog.map((catItem: any, i: number) => <StoreItem item={catItem} index={i} key={i} />);

	return <>{!loading && catalog.length > 0 ? handleCatalog : <LoadingSpinner />}</>;
};

const mapStateToProps = (state: any) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(StoreItems);
