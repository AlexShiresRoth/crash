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
	itemImages: Array<any>;
}

const StoreItem = ({ item, index, addToCart, removeFromCart, itemImages, store: { cart } }: Props) => {
	const [sizes, selectSizes] = useState<Array<any>>([]);

	//check if item is already in cart
	const handleIsInCart = (data: any) => cart.filter((cartItem: any) => cartItem.id === data.id).length > 0;

	//ids for clothing items from square
	//other categories like cd's do not need to have a size
	const clothingCategories = ['YN762CCYIVI5QU265ZBPHCUA', 'P77GQOLSO4ZI5LGXIGLXYPAX', 'VX6DX7KQVPQW5HPQ5NC5XTBH'];

	const handleAddToCart = () => {
		//add this to cart if item is clothing
		const itemAndSizes = { ...item, sizes };
		//make sure item is cat:clothing to require size addition
		if (clothingCategories.includes(item.item_data.category_id)) {
			return sizes.length > 0
				? handleIsInCart(item)
					? removeFromCart(item.id)
					: addToCart(itemAndSizes)
				: alert('Please select a size');
		} else {
			return handleIsInCart(item) ? removeFromCart(item.id) : addToCart(itemAndSizes);
		}
	};

	const handleSelectSize = (data: any) => {
		return sizes.includes(data)
			? selectSizes((prevState) => prevState.splice(prevState.indexOf(data), 1))
			: selectSizes((prevState) => [data, ...prevState]);
	};

	const hasImage = () => {
		return item.image_id
			? itemImages.filter((image) => item.image_id === image.id)[0].image_data.url
			: 'https://res.cloudinary.com/snackmanproductions/image/upload/v1594330128/crash/unnamed_jvhuaj.jpg';
	};

	return (
		<div className={style.item} key={index}>
			<div className={style.heading}>
				<p>{item.item_data.name}</p>
				<img src={hasImage()} alt="None yet" />
			</div>
			{clothingCategories.includes(item.item_data.category_id) ? (
				<div className={style.variations}>
					<>
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
					</>
				</div>
			) : null}

			<div className={style.price}>
				<p>
					<span>Item Price:</span>$
					{(parseFloat(item.item_data.variations[0].item_variation_data.price_money.amount) / 100).toFixed(2)}
				</p>
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
