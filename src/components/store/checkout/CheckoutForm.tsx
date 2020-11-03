import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './CheckoutForm.module.scss';
import { connect } from 'react-redux';
import { clearCheckout, processCheckout } from '../../../actions/store';
import StoreAlert from '../alerts/StoreAlert';
import TotalDisplay from './TotalDisplay';
import LoadingSpinner from '../../reusablecomps/LoadingSpinner';

interface Props {
	processCheckout: (id: string) => any;
	store?: any;
	alerts?: any;
	email?: any;
	clearCheckout: (val: any) => void;
}

// const storageToken = localStorage.getItem('checkout') || '';

const CheckoutForm = ({
	processCheckout,
	store: { cart, checkout, checkoutErrors, shippingInfo, processed },
	alerts,
}: Props) => {
	const [processing, setProcessing] = useState(false);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setProcessing(true);
		processCheckout(checkout.id);
		console.log('processing');

		return (window.location = checkout.webUrl);
	};

	useEffect(() => {
		if (processed) setProcessing(false);
	}, [processed]);
	console.log(checkout.id);
	return (
		<div className={style.checkout}>
			<div className={style.heading}>
				<TotalDisplay />
				{checkoutErrors && checkoutErrors.length > 0
					? alerts.map((alert: any, i: number) => (
							<StoreAlert type={alert.alertType} status={alert.msg} key={i} />
					  ))
					: null}
			</div>
			<form onSubmit={(e) => onSubmit(e)}>
				<div className={style.btn_container}>
					{shippingInfo ? (
						processing ? (
							<LoadingSpinner />
						) : (
							<button onSubmit={(e) => onSubmit(e)}>Checkout Now</button>
						)
					) : (
						<button className={style.disabled} disabled={true}>
							Please enter your shipping info to proceed to checkout
						</button>
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

export default connect(mapStateToProps, { processCheckout, clearCheckout })(CheckoutForm);
