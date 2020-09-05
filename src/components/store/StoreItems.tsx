import React from 'react';
import StoreItem from './StoreItem';
import { connect } from 'react-redux';
import LoadingSpinner from '../reusablecomps/LoadingSpinner';

interface Props {
	store?: any;
}

const StoreItems = ({ store: { catalog, loading, searchResults } }: Props) => {
	const handleCatalog = catalog.map((catItem: any, i: number) => <StoreItem item={catItem} index={i} key={i} />);
	const handleSearch = searchResults.map((item: any, i: number) => <StoreItem item={item} index={i} key={i} />);
	return (
		<>
			{!loading && catalog.length > 0 ? (
				searchResults.length > 0 ? (
					handleSearch
				) : (
					handleCatalog
				)
			) : (
				<LoadingSpinner />
			)}
		</>
	);
};

const mapStateToProps = (state: any) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(StoreItems);
