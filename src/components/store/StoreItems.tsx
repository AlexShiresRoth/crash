import React from 'react';
import PropTypes from 'prop-types';
import StoreItem from './StoreItem';

interface Props {
	catalog: any;
}

const StoreItems = ({ catalog }: Props) => {
	//when user searches through catalog, the image may come as a related_object
	const itemImages =
		catalog.objects.filter((item: any) => item.type === 'IMAGE').length > 0
			? catalog.objects.filter((item: any) => item.type === 'IMAGE')
			: catalog.related_objects.filter((item: any) => item.type === 'IMAGE');

	const storeItems = catalog.objects
		.filter((item: any) => item.type === 'ITEM')
		.map((item: any, i: number) => {
			return <StoreItem item={item} key={i} index={i} itemImages={itemImages} />;
		});
	return <>{storeItems}</>;
};

StoreItems.propTypes = {
	catalog: PropTypes.object,
};

export default StoreItems;
