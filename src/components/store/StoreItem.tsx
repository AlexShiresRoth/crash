import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './StoreItem.module.scss';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/store';
import StoreAlert from './alerts/StoreAlert';

//TODO FIGURE OUT THIS FUCKING GARBAGEEEDFZSDFGZDFGFZDGZDFGSZDFGZDFGZSDFG
interface Props {
	item: any;
	index: number;
	addToCart: (val: any) => any;
	store?: any;
	removeFromCart: (val: any, id: string) => any;
}

const StoreItem = ({ item, index, addToCart, removeFromCart, store: { cart, loading } }: Props) => {
	const [selectedItem, selectItem] = useState<any>({
		option: null,
	});

	const { option } = selectedItem;
	//Handle alerting user if adding cart to item fails
	const [alerted, setAlert] = useState({
		sizeError: false,
		status: '',
	});

	const { sizeError, status } = alerted;

	const onChange = (e: React.FormEvent<HTMLSelectElement>) =>
		selectItem({ ...selectedItem, option: e.currentTarget.value });

	//check if item is already in cart
	const handleIsInCart = (data: any) => cart.filter((cartItem: any) => cartItem.id === data.id).length > 0;

	const handleAddToCart = () => {
		return option
			? addToCart(selectedItem)
			: setAlert({
					sizeError: true,
					status: 'Please choose a size',
			  });
	};

	useEffect(() => {
		if (option !== '') setAlert({ sizeError: false, status: '' });
	}, [option]);

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
							{sizeError ? <StoreAlert status={status} type={'danger'} /> : null}
							<select
								onChange={(e) => onChange(e)}
								style={sizeError ? { border: '2px solid #8f2b2bb0' } : {}}
								className={style.select_box}
							>
								<option>Choose a size</option>
								{item.variants.map((variant: any, i: number) => {
									return (
										<option key={i} value={variant.id}>
											{variant.title}
										</option>
									);
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
