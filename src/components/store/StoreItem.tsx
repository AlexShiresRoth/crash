import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './StoreItem.module.scss';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/store';

interface Props {
	item: any;
	index: number;
	addToCart: (val: any) => any;
	store?: any;
	removeFromCart: (val: any) => any;
}

const StoreItem = ({ item, index, addToCart, removeFromCart, store: { cart } }: Props) => {
	const [sizes, selectSizes] = useState<Array<any>>([]);

	//check if item is already in cart
	const handleIsInCart = (data: any) => cart.filter((cartItem: any) => cartItem.id === data.id).length > 0;

	const handleAddToCart = () => {
		return sizes.length > 0
			? handleIsInCart(item)
				? removeFromCart(item.id)
				: addToCart(item)
			: alert('Please select a size');
	};

	const handleSelectSize = (data: any) => {
		return sizes.includes(data)
			? selectSizes((prevState) => prevState.splice(prevState.indexOf(data), 1))
			: selectSizes((prevState) => [data, ...prevState]);
	};

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
						return (
							<button
								onClick={() => handleSelectSize(variation.item_variation_data.name)}
								className={
									sizes.length > 0
										? sizes.includes(variation.item_variation_data.name)
											? style.selected
											: ''
										: ''
								}
								key={i}
							>
								{variation.item_variation_data.name}
							</button>
						);
					})}
				</div>
			</div>
			<div className={style.actions}>
				<button onClick={(e) => handleAddToCart()} className={handleIsInCart(item) ? style.in_cart : ''}>
					{handleIsInCart(item) ? 'Remove From Cart' : 'Add To Cart'}
				</button>
			</div>
		</div>
	);
};

StoreItem.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number.isRequired,
};

const mapStateToProps = (state: { store: any }) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, { addToCart, removeFromCart })(StoreItem);
