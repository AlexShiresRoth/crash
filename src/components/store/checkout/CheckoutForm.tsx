import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import style from './CheckoutForm.module.scss';
import { connect } from 'react-redux';
import { processCheckout } from '../../../actions/store';

interface Props {
	processCheckout: (val: any) => any;
	store?: any;
}

const CheckoutForm = ({ processCheckout, store: { cart, checkout } }: Props) => {
	const [formData, setFormData] = useState<any>({
		email: '',
		checkoutId: localStorage.getItem('checkout'),
	});
	const { email } = formData;
	const onChange = (e: React.FormEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (cart.length > 0) {
			processCheckout(formData);
			window.location.href = checkout.webUrl;
		}
	};
	return (
		<div className={style.checkout}>
			<form>
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
					<button onSubmit={(e) => onSubmit(e)}>Proceed To Checkout</button>
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
