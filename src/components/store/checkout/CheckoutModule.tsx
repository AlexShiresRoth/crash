import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import style from './CheckoutModule.module.scss';
import LoadingSpinner from '../../reusablecomps/LoadingSpinner';

interface Props {
	store?: any;
}

const CheckoutModule = ({ store: { cart, images, loading } }: Props) => {
	if (cart.length <= 0) {
		return <Redirect to="/store" />;
	}

	return (
		<section className={style.section}>
			{!loading && cart.length > 0 ? (
				<div className={style.container}>
					{cart.map((cartItem: any) => {
						return images.objects
							.filter((img: any) => {
								// find image referenced by id in the cart
								return cartItem.image_id === img.id;
							})
							.map((foundImg: any, i: number) => {
								console.log(foundImg);

								return (
									<div key={i}>
										<img src={`${foundImg.image_data.url}`} alt={`${foundImg.image_data.name}`} />
									</div>
								);
							});
					})}
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

export default connect(mapStateToProps, null)(CheckoutModule);
