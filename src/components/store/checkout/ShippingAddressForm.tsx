import React, { useState } from 'react';
import style from './ShippingAddressForm.module.scss';
import { connect } from 'react-redux';
import { submitShippingInfo } from '../../../actions/store';

interface Props {
	submitShippingInfo: (data: any) => any;
}

const ShippingAddressForm = ({ submitShippingInfo }: Props) => {
	const [formData, setFormData] = useState<any>({
		email: '',
		address: '',
		zipCode: '',
		name: '',
		city: '',
		country: '',
		state: '',
	});

	const { email, address, zipCode, name, city, country, state } = formData;

	const onChange = (e: React.FormEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

	const formSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		submitShippingInfo(formData);
	};

	return (
		<div className={style.form_container}>
			<h2>Shipping Address Form</h2>
			<form className={style.form} onSubmit={(e) => formSubmit(e)}>
				<div className={style.grid}>
					<div className={style.col}>
						<div className={style.input_col}>
							<label>Email</label>
							<input
								type="email"
								value={email}
								name="email"
								placeholder="please enter your email"
								onChange={(e) => onChange(e)}
								required={true}
							/>
						</div>
						<div className={style.input_col}>
							<label>Name</label>
							<input
								type="text"
								value={name}
								name="name"
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
					</div>
					<div className={style.col}>
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
					<button onSubmit={(e) => formSubmit(e)}>Submit</button>
				</div>
			</form>
		</div>
	);
};

export default connect(null, { submitShippingInfo })(ShippingAddressForm);
