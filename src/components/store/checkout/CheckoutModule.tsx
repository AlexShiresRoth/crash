import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import style from './CheckoutModule.module.scss';
import LoadingSpinner from '../../reusablecomps/LoadingSpinner';
import { removeFromCart } from '../../../actions/store';
import ShippingAddressForm from './ShippingAddressForm';

interface Props {
	removeFromCart: (val: any) => any;
	store?: any;
}

const CheckoutModule = ({ store: { cart, images, loading }, removeFromCart }: Props) => {
	if (cart.length <= 0) {
		return <Redirect to="/store" />;
	}
	console.log(cart);
	return (
		<section className={style.section}>
			{!loading && cart.length > 0 ? (
				<div className={style.container}>
					<ShippingAddressForm />
					<div className={style.items}>
						{cart.map((cartItem: any) => {
							return images.objects
								.filter((img: any) => {
									// find image referenced by id in the cart
									return cartItem.image_id === img.id;
								})
								.map((foundImg: any, i: number) => {
									return (
										<div className={style.item_container} key={i}>
											<div key={i} className={style.img_container}>
												<img
													src={`${foundImg.image_data.url}`}
													alt={`${foundImg.image_data.name}`}
												/>
											</div>
											<div className={style.content}>
												<h2>{cartItem.item_data.name}</h2>
												<p>{cartItem.size}</p>
												<p>
													$
													{(
														parseFloat(
															cartItem.item_data.variations[0].item_variation_data
																.price_money.amount
														) / 100
													).toFixed(2)}
												</p>
											</div>
											<div className={style.btn_container}>
												<button onClick={() => removeFromCart(cartItem.id)}>X Remove</button>
											</div>
										</div>
									);
								});
						})}
					</div>
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

export default connect(mapStateToProps, { removeFromCart })(CheckoutModule);
