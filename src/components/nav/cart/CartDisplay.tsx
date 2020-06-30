import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeFromCart } from '../../../actions/store';
import style from './CartDisplay.module.scss';

interface Props {
	store?: any;
	removeFromCart: (val: any) => any;
	setVisibility: (val: boolean) => any;
	isVisible: boolean;
}

const CartDisplay = ({ store: { cart, loading }, removeFromCart, isVisible, setVisibility }: Props) => {
	return (
		<div className={isVisible ? style.container : style.hidden}>
			<div className={style.close_cart}>
				<button onClick={() => setVisibility(!isVisible)}>Close X</button>
			</div>
			<div className={style.heading}>
				<h2>In your cart</h2>
			</div>
			<div className={style.items}>
				{cart.map((item: any, i: number) => {
					console.log(item);
					const name = item.item_data.name;
					return (
						<div key={i}>
							<p>{name}</p>
						</div>
					);
				})}
			</div>
			<div className={style.checkout}>
				<button>Proceed to Checkout</button>
			</div>
		</div>
	);
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
