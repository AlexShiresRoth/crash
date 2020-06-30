import React, { useState } from 'react';
import { connect } from 'react-redux';
import style from './Cart.module.scss';
import CartDisplay from './CartDisplay';

interface Props {
	store?: any;
}

const Cart = ({ store: { cart } }: Props) => {
	const [isVisible, setVisibility] = useState<boolean>(false);

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
