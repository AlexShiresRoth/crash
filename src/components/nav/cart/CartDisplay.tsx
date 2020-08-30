import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeFromCart } from '../../../actions/store';
import style from './CartDisplay.module.scss';
import { Link } from 'react-router-dom';

interface Props {
	store?: any;
	removeFromCart: (val: any, variantId: string) => any;
	setVisibility: (val: boolean) => any;
	isVisible: boolean;
}

const CartDisplay = ({ store: { cart, loading, images }, removeFromCart, isVisible, setVisibility }: Props) => {
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
					const itemVariant = item.variants.filter((variant: any) => variant.title === item.size)[0];
					return (
						<div key={i} className={style.item}>
							<img src={item.images[0].src} alt={item.name} />
							<div className={style.content}>
								<p>{item.title}</p>
								{item.size !== null ? (
									<div className={style.sizes}>Selected Size: {item.size}</div>
								) : null}
							</div>
							<div className={style.remove}>
								<button onClick={(e) => removeFromCart(item.id, itemVariant.id)}>X</button>
							</div>
						</div>
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
