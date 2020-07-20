import React from 'react';
import StoreItem from './StoreItem';
import { connect } from 'react-redux';
import LoadingSpinner from '../reusablecomps/LoadingSpinner';

interface Props {
	store?: any;
}

const StoreItems = ({ store: { catalog, loading, categories, searchResults } }: Props) => {
	//TODO figure out how to retrieve catalog objects based upon recieving the category id of a search result
	//TODO create an action that clears search results
	const handleCatalog = () => {
		switch (true) {
			case catalog.objects.length > 0 && searchResults.length === 0:
				return catalog.objects
					.filter((item: any) => item.type === 'ITEM')
					.map((item: any, i: number) => <StoreItem item={item} key={i} index={i} />);
			case searchResults.objects && searchResults.objects.length > 0:
				//If user searches, give results to that search.
				//The returned data can be a category or an Item
				//This will filter out results to only use the category
				if (searchResults.objects.filter((item: any) => item.type === 'CATEGORY').length > 0) {
					let foundIndex = 0;
					searchResults.objects.filter((item: any, i: number) =>
						item.type === 'CATEGORY' ? (foundIndex = i) : null
					);
					return catalog.objects
						.filter(
							(item: any) =>
								item.type === 'ITEM' &&
								item.item_data.category_id === searchResults.objects[foundIndex].id
						)
						.map((item: any, i: number) => <StoreItem item={item} key={i} index={i} />);
				}
				break;
			default:
				return;
		}
	};

	return <>{!loading && catalog.objects ? handleCatalog() : <LoadingSpinner />}</>;
};

const mapStateToProps = (state: any) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(StoreItems);
