import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import style from './CheckoutForm.module.scss';
import { connect } from 'react-redux';
import { processCheckout } from '../../../actions/store';
import { Redirect } from 'react-router';

interface Props {
	processCheckout: (val: any, id: string) => any;
	store?: any;
}

const CheckoutForm = ({ processCheckout, store: { cart, checkout, returnUrl } }: Props) => {
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
			processCheckout(formData, checkoutId);
		}
	};
	if (returnUrl !== null) {
		return <Redirect to={{ pathname: '/redirect', state: { redirect: `${returnUrl}` } }} />;
	}

	return (
		<div className={style.checkout}>
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

// CheckoutForm.propTypes = {};

const mapStateToProps = (state: any) => ({
	store: state.store,
});

export default connect(mapStateToProps, { processCheckout })(CheckoutForm);
