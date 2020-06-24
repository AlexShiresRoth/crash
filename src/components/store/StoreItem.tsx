import React from 'react';
import PropTypes from 'prop-types';
import style from './StoreItem.module.scss';

interface Props {
	item: any;
	index: number;
}

const StoreItem = ({ item, index }: Props) => {
	console.log(item);
	return (
		<div className={style.item} key={index}>
			<div className={style.heading}>
				<img src="" alt="None yet" />
				<p>{item.item_data.name}</p>
			</div>
			<div className={style.variations}>
				<div className={style.row}>
					<p>Sizes/Colors Available</p>
				</div>
				<div className={style.row}>
					{item.item_data.variations.map((variation: any, i: number) => {
						return <button>{variation.item_variation_data.name}</button>;
					})}
				</div>
			</div>
			<div className={style.actions}>
				<button>Add To Cart</button>
			</div>
		</div>
	);
};

StoreItem.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number.isRequired,
};

export default StoreItem;
