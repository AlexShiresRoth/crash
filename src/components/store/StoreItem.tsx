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
	const [formData, setFormData] = useState({
		size: '',
	});

	const { size } = formData;

	const onChange = (e: React.FormEvent<HTMLSelectElement>) =>
		setFormData({ ...formData, size: e.currentTarget.value });

	//check if item is already in cart
	const handleIsInCart = (data: any) => cart.filter((cartItem: any) => cartItem.id === data.id).length > 0;

	//ids for clothing items from square
	//other categories like cd's do not need to have a size
	const clothingCategories = ['YN762CCYIVI5QU265ZBPHCUA', 'P77GQOLSO4ZI5LGXIGLXYPAX', 'VX6DX7KQVPQW5HPQ5NC5XTBH'];

	const handleAddToCart = () => {
		//add this to cart if item is clothing
		const itemAndSizes = { ...item, size };
		//make sure item is cat:clothing to require size addition
		if (clothingCategories.includes(item.item_data.category_id)) {
			return size
				? handleIsInCart(item)
					? removeFromCart(item.id)
					: addToCart(itemAndSizes)
				: alert('Please select a size');
		} else {
			return handleIsInCart(item) ? removeFromCart(item.id) : addToCart(itemAndSizes);
		}
	};

	const hasImage = () => {
		return item.image_id
			? itemImages.filter((image) => item.image_id === image.id)[0].image_data.url
			: 'https://res.cloudinary.com/snackmanproductions/image/upload/v1594330128/crash/unnamed_jvhuaj.jpg';
	};

	const handleVariationSelect = () => {
		let foundIndex = 0;

		item.item_data.variations.map((variation: any, i: number) => {
			return variation.item_variation_data.name === size ? (foundIndex = i) : null;
		});

		return foundIndex;
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
							<form>
								<select onChange={(e) => onChange(e)}>
									<option value=""></option>
									{item.item_data.variations.map((variation: any, i: number) => {
										// console.log(variation);
										return (
											<option key={i} value={variation.item_variation_data.name}>
												{variation.item_variation_data.name}
											</option>
										);
									})}
								</select>
							</form>
						</div>
					</>
				</div>
			) : null}

			<div className={style.price}>
				<p>
					<span>Item Price:</span>
					{size !== ''
						? '$' +
						  (
								parseFloat(
									item.item_data.variations[handleVariationSelect()].item_variation_data.price_money
										.amount
								) / 100
						  ).toFixed(2)
						: 'Choose a size'}
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
