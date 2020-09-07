import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './CheckoutForm.module.scss';
import { connect } from 'react-redux';
import { processCheckout } from '../../../actions/store';
import { Redirect } from 'react-router';
import { FaShopify } from 'react-icons/fa';
import { emailSignup } from '../../../actions/email';
import StoreAlert from '../alerts/StoreAlert';

interface Props {
	processCheckout: (val: any, id: string) => any;
	store?: any;
	emailSignup: (data: any) => any;
	alerts?: any;
	email?: any;
}

const CheckoutForm = ({
	processCheckout,
	store: { cart, returnUrl, processed },
	email: { errors },
	emailSignup,
	alerts,
}: Props) => {
	const [formData, setFormData] = useState<any>({
		email: '',
		checkoutId: localStorage.getItem('checkout'),
	});
	const { email } = formData;
	const onChange = (e: React.FormEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

	const onSubmit = (e: React.FormEvent) => {
		const checkoutId = localStorage.getItem('checkout') || '';
		e.preventDefault();
		if (cart.length > 0) {
			emailSignup(formData);
			processCheckout(formData, checkoutId);
		}
	};

	//do not allow for redirect if there are any errors
	if (returnUrl !== null && processed) {
		console.log(errors);
		if (!errors) return <Redirect to={{ pathname: '/redirect', state: { redirect: `${returnUrl}` } }} />;
	}

	return (
		<div className={style.checkout}>
			<div className={style.heading}>
				<h1>
					Checkout with Shopify <FaShopify />
				</h1>
				{alerts.length > 0
					? alerts.map((alert: any, i: number) => (
							<StoreAlert type={alert.alertType} status={alert.msg} key={i} />
					  ))
					: null}
			</div>
			<form onSubmit={(e) => onSubmit(e)}>
				<div className={style.input_col}>
					<label>Email</label>
					<input
						type="email"
						value={email}
						name="email"
						placeholder="Please enter your email"
						required={true}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className={style.btn_container}>
					<button onSubmit={(e) => onSubmit(e)}>Proceed To Secure Checkout </button>
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

export default connect(mapStateToProps, { processCheckout, emailSignup })(CheckoutForm);
