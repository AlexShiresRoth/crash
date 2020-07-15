import React from 'react';
import StoreItem from './StoreItem';
import { connect } from 'react-redux';
import LoadingSpinner from '../reusablecomps/LoadingSpinner';

interface Props {
	store?: any;
}

const StoreItems = ({ store: { catalog, loading } }: Props) => {
	//TODO figure out how to retrieve catalog objects based upon receiving the category id of a search result
	const handleCatalog = (item: any, i: number) => {
		switch (true) {
			case item.type === 'ITEM':
				return <StoreItem item={item} key={i} index={i} />;
			case item.type === 'CATEGORY':
				return;
			default:
				return;
		}
	};
	return (
		<>
			{!loading && catalog.objects ? (
				catalog.objects.map((item: any, i: number) => {
					return handleCatalog(item, i);
				})
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
