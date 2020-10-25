import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import style from './Cart.module.scss';
import CartDisplay from './CartDisplay';
import { withRouter, RouteComponentProps } from 'react-router';
import { FaShoppingCart, FaCartPlus } from 'react-icons/fa';

interface Props {
	store?: any;
}

type CartProps = RouteComponentProps & Props;

const Cart = ({ store: { cart }, history }: CartProps) => {
	const [isVisible, setVisibility] = useState<boolean>(false);
	const [newAdd, setNewAddition] = useState<boolean>(false);
	const [cartLength, setCartLength] = useState<number>(0);
	//do not show the cart if the user is not on the store page
	useEffect(() => {
		if (!history.location.pathname.includes('store')) setVisibility(false);
	}, [history.location.pathname]);

	useEffect(() => {
		setCartLength((prevState: any) => {
			console.log(prevState, cart.length);
			cart.length > prevState ? setNewAddition(() => true) : setNewAddition(false);
			return cart.length;
		});
	}, [cart]);

	useEffect(() => {
		setTimeout(() => {
			setNewAddition(() => false);
		}, 2000);
		return () => clearTimeout();
	}, [cartLength]);

	return (
		<div className={style.cart}>
			<button onClick={() => setVisibility(!isVisible)}>
				Cart
				{newAdd ? <FaCartPlus className={style.added} /> : <FaShoppingCart />}
				{cart.length > 0 ? <span>{cart.length}</span> : null}
			</button>
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
