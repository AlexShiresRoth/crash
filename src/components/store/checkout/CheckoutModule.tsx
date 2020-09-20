import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import style from './CheckoutModule.module.scss';
import LoadingSpinner from '../../reusablecomps/LoadingSpinner';
import { removeFromCart, fetchCheckout } from '../../../actions/store';
import ShippingAddressForm from './ShippingAddressForm';
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
							<div className={style.heading}>
								<h2>Shopping Cart</h2>
								<p>Item count in cart: {cart.length}</p>
							</div>
							<div className={style.sub_heading}>
								<p>Item</p>
								<p>Price</p>
							</div>
							<div className={style.items}>
								{cart.map((cartItem: any, i: number) => {
									const itemToRemove = checkout.lineItems.filter(
										(lineItem: any) => lineItem.variant.id === cartItem.variant.id
									)[0];
									console.log(cartItem);
									return (
										<div className={style.item_container} key={i}>
											<div className={style.col}>
												<img src={cartItem.variant.image.src} alt={cartItem.title} />
											</div>
											<div className={style.col}>
												<h3>{cartItem.title}</h3>
												<p>
													<span>
														{cartItem.variant.selectedOptions.filter(
															(variant: any) => variant.name.toLowerCase() === 'size'
														).length > 0
															? 'Size:'
															: 'Type:'}
													</span>{' '}
													{cartItem.variant.title}
												</p>
											</div>
											<div className={style.col}>
												<p>
													<span>Quantity:</span> {cartItem.quantity}
												</p>
												<p>
													<span>Item Price</span>${cartItem.variant.price}
												</p>
												<p>
													<span>Total:</span> $
													{(cartItem.quantity * parseFloat(cartItem.variant.price))
														.toFixed(2)
														.toString()}
												</p>
											</div>
											<div className={style.col}>
												<button onClick={() => removeFromCart(cartItem.id, itemToRemove)}>
													Remove X
												</button>
											</div>
										</div>
									);
								})}
							</div>
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
					<CheckoutForm shippingInfo={shippingInfo} />
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
