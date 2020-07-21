import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import style from './Cart.module.scss';
import CartDisplay from './CartDisplay';

interface Props {
	store?: any;
}

const Cart = ({ store: { cart } }: Props) => {
	const [isVisible, setVisibility] = useState<boolean>(false);

	useEffect(() => {
		//Show the cart on an update
		setVisibility(true);

		setTimeout(() => {
			setVisibility(false);
		}, 3000);

		return () => clearTimeout();
	}, [cart.length]);

	return (
		<div className={style.cart}>
			<button onClick={() => setVisibility(!isVisible)}>Cart({cart.length})</button>
			{cart.length > 0 ? <CartDisplay isVisible={isVisible} setVisibility={setVisibility} /> : null}
		</div>
	);
};

const mapStateToProps = (state: { store: object }) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, null)(Cart);
