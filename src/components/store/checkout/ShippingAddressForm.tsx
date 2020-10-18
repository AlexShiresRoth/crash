import React, { useState, useEffect } from 'react';
import style from './ShippingAddressForm.module.scss';
import { connect } from 'react-redux';
import { submitShippingInfo } from '../../../actions/store';
import StoreAlert from '../alerts/StoreAlert';
import { states } from '../../reusablecomps/states';
import LoadingSpinner from '../../reusablecomps/LoadingSpinner';

interface Props {
	submitShippingInfo: (data: any, val: boolean) => any;
	store?: any;
	alerts: Array<any>;
}

const ShippingAddressForm = ({ submitShippingInfo, store: { checkout, shippingErrors }, alerts }: Props) => {
	const [formData, setFormData] = useState<any>({
		address1: '',
		address2: '',
		city: '',
		company: null,
		firstName: '',
		lastName: '',
		phone: '',
		province: '',
		zip: '',
		checkoutId: '',
	});

	const { address1, zip, firstName, lastName, city, province } = formData;

	const onChange = (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) =>
		setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

	const formSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setProcessing(true);
		submitShippingInfo(formData, false);
	};

	useEffect(() => {
		if (localStorage.getItem('checkout')) {
			setFormData(() => ({
				address1,
				address2: '',
				city,
				company: null,
				firstName,
				lastName,
				phone: '',
				province,
				zip,
				checkoutId: localStorage.getItem('checkout'),
			}));
		}
	}, [address1, zip, firstName, lastName, city, province, checkout]);

	const [processing, setProcessing] = useState<boolean>(false);

	useEffect(() => {
		if (shippingErrors.length > 0) setProcessing(false);
	}, [shippingErrors]);

	return (
		<div className={style.form_container}>
			<h2>Shipping Address Form</h2>
			<p>Currently, only shipping within the US</p>
			{shippingErrors.length > 0
				? alerts.map((alert, i) => <StoreAlert status={alert.msg} key={i} type={alert.alertType} />)
				: null}
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
								value={address1}
								name="address1"
								placeholder="543 N Washington St."
								onChange={(e) => onChange(e)}
								required={true}
							/>
						</div>
					</div>
					<div className={style.col}>
						<div className={style.input_col}>
							<label>State</label>
							<select name="province" value={province} onChange={(e) => onChange(e)} required={true}>
								<option>Select your State</option>
								{states.map((state: any, i: number) => {
									return (
										<option value={state.name} key={i}>
											{state.name}
										</option>
									);
								})}
							</select>
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
								value={zip}
								name="zip"
								placeholder="Enter your Zip"
								onChange={(e) => onChange(e)}
								required={true}
							/>
						</div>
					</div>
				</div>
				<div className={style.btn_col}>
					{!processing ? (
						<button onSubmit={(e) => formSubmit(e)}>Save Shipping Info</button>
					) : (
						<>
							Saving <LoadingSpinner updateStyle={{ size: '1rem', color: '#111' }} />
						</>
					)}
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	store: state.store,
	alerts: state.alerts,
});

export default connect(mapStateToProps, { submitShippingInfo })(ShippingAddressForm);
