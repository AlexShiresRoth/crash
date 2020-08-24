import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './StoreItem.module.scss';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/store';
import StoreAlert from './alerts/StoreAlert';

interface Props {
	item: any;
	index: number;
	addToCart: (val: any) => any;
	store?: any;
	removeFromCart: (val: any) => any;
}

const StoreItem = ({ item, index, addToCart, removeFromCart, store: { cart, images, loading } }: Props) => {
	const [formData, setFormData] = useState({
		size: '',
	});

	//Handle alerting user if adding cart to item fails
	const [alerted, setAlert] = useState({
		sizeError: false,
		status: '',
	});

	const { sizeError, status } = alerted;

	const { size } = formData;

	const onChange = (e: React.FormEvent<HTMLSelectElement>) =>
		setFormData({ ...formData, size: e.currentTarget.value });

	//check if item is already in cart
	const handleIsInCart = (data: any) => cart.filter((cartItem: any) => cartItem.id === data.id).length > 0;

	const handleAddToCart = () => {
		const price = item.variants[0].price;
		const itemSizePrice = { ...item, size, price };
		//make sure item is cat:clothing to require size addition

		return size
			? handleIsInCart(item)
				? removeFromCart(item.id)
				: addToCart(itemSizePrice)
			: setAlert({
					sizeError: true,
					status: 'Please choose a size',
			  });
	};
	useEffect(() => {
		if (size !== '') setAlert({ sizeError: false, status: '' });
	}, [size]);

	return !loading ? (
		<div className={style.item} key={index}>
			<div className={style.heading}>
				<img src={item.images[0].src} alt={item.title} />
				<p>{item.title}</p>
			</div>
			<div className={style.variations}>
				<>
					<div className={style.row}>
						<p>Sizes/Colors Available</p>
					</div>
					<div className={style.row}>
						<form>
							{sizeError ? <StoreAlert status={status} /> : null}
							<select
								onChange={(e) => onChange(e)}
								style={sizeError ? { border: '2px solid #8f2b2bb0' } : {}}
								className={style.select_box}
							>
								<option>Choose a size</option>
								{item.options
									.filter((option: any) => option.name === 'Size')
									.map((option: any) => {
										return option.values.map((size: any, i: number) => {
											return (
												<option key={i} value={size.value}>
													{size.value}
												</option>
											);
										});
									})}
							</select>
						</form>
					</div>
				</>
			</div>
			<div className={style.price}>
				<p>
					<span>Item Price:</span>
					{'$' + item.variants[0].price}
				</p>
			</div>
			<div className={style.actions}>
				<button onClick={(e) => handleAddToCart()} className={handleIsInCart(item) ? style.in_cart : ''}>
					{handleIsInCart(item) ? 'Remove From Cart' : 'Add To Cart'}
				</button>
			</div>
		</div>
	) : null;
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
