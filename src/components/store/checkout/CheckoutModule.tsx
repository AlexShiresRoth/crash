import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import style from './CheckoutModule.module.scss';
import LoadingSpinner from '../../reusablecomps/LoadingSpinner';
import { removeFromCart, startOrder, fetchCheckout } from '../../../actions/store';
import ShippingAddressForm from './ShippingAddressForm';
import TotalDisplay from './TotalDisplay';
import CheckoutForm from './CheckoutForm';

interface Props {
	removeFromCart: (val: any) => any;
	store?: any;
	startOrder: () => void;
	fetchCheckout: (val: string) => any;
}

const CheckoutModule = ({
	store: { cart, loading, shippingInfo, checkout },
	removeFromCart,
	startOrder,
	fetchCheckout,
}: Props) => {
	useEffect(() => {
		//if a checkout has not been completed update current
		if (!localStorage.getItem('checkout')) {
			console.log('new order');
			startOrder();
		} else {
			console.log('found order', localStorage.getItem('checkout'));
			const id = localStorage.getItem('checkout') || '';
			fetchCheckout(id);
		}
	}, [startOrder, fetchCheckout]);

	if (cart.length <= 0) {
		return <Redirect to="/store" />;
	}
	console.log(checkout);
	return (
		<section className={style.section}>
			{!loading && cart.length > 0 ? (
				<div className={style.inner}>
					<div className={style.container}>
						<div className={style.items_container}>
							<h2>My Order</h2>
							<div className={style.items}>
								{cart.map((cartItem: any, i: number) => {
									return (
										<div className={style.item_container} key={i}>
											<div className={style.img_container}>
												<img src={cartItem.images[0].src} alt={cartItem.title} />
											</div>
											<div className={style.content}>
												<h2>{cartItem.title}</h2>
												<p>{cartItem.size}</p>
												<p>${cartItem.variants[0].price}</p>
											</div>
											<div className={style.btn_container}>
												<button onClick={() => removeFromCart(cartItem.id)}>X</button>
											</div>
										</div>
									);
								})}
							</div>
							<TotalDisplay />
						</div>
						{shippingInfo ? (
							<>
								<p>Shipping info is saved!</p>
								<button>Update Info</button>
							</>
						) : (
							<ShippingAddressForm />
						)}
					</div>
					{shippingInfo ? <CheckoutForm /> : <p>Please enter your shpping info before checking out</p>}
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

export default connect(mapStateToProps, { removeFromCart, startOrder, fetchCheckout })(CheckoutModule);
