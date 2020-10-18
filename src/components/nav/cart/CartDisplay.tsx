import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeFromCart } from '../../../actions/store';
import style from './CartDisplay.module.scss';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

interface Props {
	store?: any;
	removeFromCart: (val: any, variantId: any) => any;
	setVisibility: (val: boolean) => any;
	isVisible: boolean;
}

const CartDisplay = ({ store: { cart, loading, checkout }, removeFromCart, isVisible, setVisibility }: Props) => {
	return !loading ? (
		<div className={isVisible ? style.container : style.hidden}>
			<div className={style.close_cart}>
				<button onClick={() => setVisibility(!isVisible)}>Close X</button>
			</div>
			<div className={style.heading}>
				<h2>In your cart</h2>
			</div>
			<div className={style.items}>
				{cart.map((item: any, i: number) => {
					const itemToRemove = checkout.lineItems.filter(
						(lineItem: any) => lineItem.variant.id === item.variant.id
					)[0];

					return (
						<CartItem
							itemToRemove={itemToRemove}
							item={item}
							index={i}
							removeFromCart={removeFromCart}
							key={i}
						/>
					);
				})}
			</div>
			<div className={style.checkout}>
				<Link to="/checkout">
					<button>Proceed to Checkout</button>
				</Link>
			</div>
		</div>
	) : null;
};

CartDisplay.propTypes = {
	store: PropTypes.object,
};

const mapStateToProps = (state: any) => {
	return {
		store: state.store,
	};
};

export default connect(mapStateToProps, { removeFromCart })(CartDisplay);
