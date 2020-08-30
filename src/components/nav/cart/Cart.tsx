import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import style from './Cart.module.scss';
import CartDisplay from './CartDisplay';
import { withRouter, RouteComponentProps } from 'react-router';

interface Props {
	store?: any;
}

type CartProps = RouteComponentProps & Props;

const Cart = ({ store: { cart }, history }: CartProps) => {
	const [isVisible, setVisibility] = useState<boolean>(false);

	//do not show the cart if the user is not on the store page
	useEffect(() => {
		if (!history.location.pathname.includes('store')) setVisibility(false);
	}, [history.location.pathname]);

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

export default connect(mapStateToProps, null)(withRouter(Cart));
