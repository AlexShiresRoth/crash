import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './CheckoutForm.module.scss';
import { connect } from 'react-redux';
import { processCheckout } from '../../../actions/store';
import StoreAlert from '../alerts/StoreAlert';
import TotalDisplay from './TotalDisplay';

interface Props {
	processCheckout: (id: string) => any;
	store?: any;
	alerts?: any;
	email?: any;
	shippingInfo: boolean;
}

const storageToken = localStorage.getItem('checkout') || '';

const CheckoutForm = ({ processCheckout, shippingInfo, store: { cart, checkout }, alerts }: Props) => {
	const [checkoutId, setId] = useState<string>('');

	useEffect(() => {
		if (storageToken !== '' || storageToken !== null) setId(storageToken);
	}, [setId]);
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (cart.length > 0 && checkoutId !== '') {
			processCheckout(checkoutId);
			if (checkout) window.open(checkout.webUrl);
		}
	};

	return (
		<div className={style.checkout}>
			<div className={style.heading}>
				<TotalDisplay />
				{alerts.length > 0
					? alerts.map((alert: any, i: number) => (
							<StoreAlert type={alert.alertType} status={alert.msg} key={i} />
					  ))
					: null}
			</div>
			<form onSubmit={(e) => onSubmit(e)}>
				<div className={style.btn_container}>
					{shippingInfo ? (
						<button onClick={(e) => onSubmit(e)}>Checkout Now</button>
					) : (
						<p>Please enter your shipping info to proceed to checkout</p>
					)}
				</div>
			</form>
		</div>
	);
};

CheckoutForm.propTypes = {
	store: PropTypes.object,
};

const mapStateToProps = (state: any) => ({
	store: state.store,
	alerts: state.alerts,
	email: state.email,
});

export default connect(mapStateToProps, { processCheckout })(CheckoutForm);
