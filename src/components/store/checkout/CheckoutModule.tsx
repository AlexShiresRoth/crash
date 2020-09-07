import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import style from './CheckoutModule.module.scss';
import LoadingSpinner from '../../reusablecomps/LoadingSpinner';
import { removeFromCart, fetchCheckout } from '../../../actions/store';
import ShippingAddressForm from './ShippingAddressForm';
import TotalDisplay from './TotalDisplay';
import CheckoutForm from './CheckoutForm';
import UpdateInfoToggle from './UpdateInfoToggle';
import UpdateAddress from './UpdateAddress';

interface Props {
	removeFromCart: (val: any, variantId: string) => any;
	store?: any;
	fetchCheckout: (val: string) => any;
}

const CheckoutModule = ({
	store: { cart, loading, shippingInfo, shippingSaved, checkout },
	removeFromCart,
	fetchCheckout,
}: Props) => {
	useEffect(() => {
		const id = localStorage.getItem('checkout') || '';
		fetchCheckout(id);
	}, [fetchCheckout, cart.length]);

	if (cart.length <= 0) {
		return <Redirect to="/store" />;
	}
	return (
		<section className={style.section}>
			{!loading && cart.length > 0 ? (
				<div className={style.inner}>
					<div className={style.container}>
						<div className={style.items_container}>
							<h2>My Order</h2>
							<div className={style.items}>
								{cart.map((cartItem: any, i: number) => {
									const itemToRemove = checkout.lineItems.filter(
										(lineItem: any) => lineItem.variant.id === cartItem.variant.id
									)[0];
									return (
										<div className={style.item_container} key={i}>
											<div className={style.col}>
												<img src={cartItem.variant.image.src} alt={cartItem.title} />
											</div>
											<div className={style.col}>
												<h3>{cartItem.title}</h3>
												<p>Quantity: {cartItem.quantity}</p>
											</div>
											<div className={style.col}>
												<p>Size: {cartItem.variant.title}</p>
												<p>Item Price:${cartItem.variant.price}</p>
												<p>
													Total: $
													{(cartItem.quantity * parseInt(cartItem.variant.price)).toString()}
												</p>
											</div>
											<div className={style.col}>
												<button onClick={() => removeFromCart(cartItem.id, itemToRemove)}>
													X
												</button>
											</div>
										</div>
									);
								})}
							</div>
							<TotalDisplay />
						</div>
						{shippingInfo ? (
							//if update info toggled, show update form
							//otherwise show that info was saved
							shippingSaved ? (
								<UpdateAddress />
							) : (
								<UpdateInfoToggle />
							)
						) : (
							<ShippingAddressForm />
						)}
					</div>
					{shippingInfo ? <CheckoutForm /> : <p>Please enter your shipping info before checking out</p>}
				</div>
			) : (
				<LoadingSpinner />
			)}
		</section>
	);
};

CheckoutModule.propTypes = {
	store: PropTypes.object,
};

const mapStateToProps = (state: any) => ({
	store: state.store,
});

export default connect(mapStateToProps, { removeFromCart, fetchCheckout })(CheckoutModule);
