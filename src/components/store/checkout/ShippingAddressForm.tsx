import React, { useState, useEffect } from 'react';
import style from './ShippingAddressForm.module.scss';
import { connect } from 'react-redux';
import { submitShippingInfo } from '../../../actions/store';

interface Props {
	submitShippingInfo: (data: any) => any;
	store?: any;
}

const ShippingAddressForm = ({ submitShippingInfo, store: { checkout } }: Props) => {
	const [formData, setFormData] = useState<any>({
		address: '',
		zipCode: '',
		firstName: '',
		lastName: '',
		city: '',
		country: '',
		state: '',
		checkoutId: '',
	});

	const { address, zipCode, firstName, lastName, city, country, state } = formData;

	const onChange = (e: React.FormEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

	const formSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		submitShippingInfo(formData);
	};

	useEffect(() => {
		if (localStorage.getItem('checkout')) {
			setFormData((prevState: any) => ({
				address,
				zipCode,
				firstName,
				lastName,
				city,
				country,
				state,
				checkoutId: localStorage.getItem('checkout'),
			}));
		}
	}, [address, zipCode, firstName, lastName, city, country, state, checkout]);
	return (
		<div className={style.form_container}>
			<h2>Shipping Address Form</h2>
			<form className={style.form} onSubmit={(e) => formSubmit(e)}>
				<div className={style.grid}>
					<div className={style.col}>
						<div className={style.input_col}>
							<label>First Name</label>
							<input
								type="text"
								value={firstName}
								name="firstName"
								placeholder="Enter your name"
								onChange={(e) => onChange(e)}
								required={true}
							/>
						</div>
						<div className={style.input_col}>
							<label>Last Name</label>
							<input
								type="text"
								value={lastName}
								name="lastName"
								placeholder="Enter your name"
								onChange={(e) => onChange(e)}
								required={true}
							/>
						</div>
						<div className={style.input_col}>
							<label>Address</label>
							<input
								type="text"
								value={address}
								name="address"
								placeholder="543 N Washington St."
								onChange={(e) => onChange(e)}
								required={true}
							/>
						</div>
					</div>
					<div className={style.col}>
						<div className={style.input_col}>
							<label>Country/Region</label>
							<input
								type="text"
								value={country}
								name="country"
								placeholder="Enter your country"
								onChange={(e) => onChange(e)}
								required={true}
							/>
						</div>
						<div className={style.input_col}>
							<label>State</label>
							<input
								type="text"
								value={state}
								name="state"
								placeholder="Enter your state"
								onChange={(e) => onChange(e)}
								required={true}
							/>
						</div>
						<div className={style.input_col}>
							<label>City</label>
							<input
								type="text"
								value={city}
								name="city"
								placeholder="Enter your city"
								onChange={(e) => onChange(e)}
								required={true}
							/>
						</div>
						<div className={style.input_col}>
							<label>Zip</label>
							<input
								type="text"
								value={zipCode}
								name="zipCode"
								placeholder="Enter your Zip"
								onChange={(e) => onChange(e)}
								required={true}
							/>
						</div>
					</div>
				</div>
				<div className={style.btn_col}>
					<button onSubmit={(e) => formSubmit(e)}>Save Shipping Info</button>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	store: state.store,
});

export default connect(mapStateToProps, { submitShippingInfo })(ShippingAddressForm);
