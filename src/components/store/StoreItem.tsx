import React from 'react';
import PropTypes from 'prop-types';
import style from './StoreItem.module.scss';

interface Props {
	item: any;
	index: number;
}

const StoreItem = ({ item, index }: Props) => {
	console.log(item);
	return <div className={style.item}></div>;
};

StoreItem.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number.isRequired,
};

export default StoreItem;
