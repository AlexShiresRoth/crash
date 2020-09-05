import React, { useState, useEffect } from 'react';
import style from './ShippingAddressForm.module.scss';
import { connect } from 'react-redux';
import { submitShippingInfo, toggleShippingModule } from '../../../actions/store';
import StoreAlert from '../alerts/StoreAlert';

interface Props {
	submitShippingInfo: (data: any, val: boolean) => any;
	store?: any;
	alerts: Array<any>;
	toggleShippingModule: (val: boolean) => any;
}

const UpdateAddress = ({
	submitShippingInfo,
	store: { shippingInfo, shippingSaved },
	alerts,
	toggleShippingModule,
}: Props) => {
	const [formData, setFormData] = useState<any>({
		address1: shippingInfo.address1,
		address2: '',
		city: shippingInfo.city,
		company: null,
		firstName: shippingInfo.firstName,
		lastName: shippingInfo.lastName,
		phone: '',
		province: shippingInfo.province,
		zip: shippingInfo.zip,
		checkoutId: localStorage.getItem('checkout'),
	});

	const { address1, zip, firstName, lastName, city, province } = formData;

	const onChange = (e: React.FormEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

	const [changes, setChangedState] = useState<boolean>(false);
	const [attempted, setAttempt] = useState<boolean>(false);

	//export this to make use as a reusable function
	const checkForChanges = () => {
		const compare1: Array<any> = [];
		const compare2: Array<any> = [];
		//use initial shipping info and remove unnecessary extra info
		const necessaryShippingInfo = {
			address1: shippingInfo.address1,
			address2: '',
			city: shippingInfo.city,
			company: null,
			firstName: shippingInfo.firstName,
			lastName: shippingInfo.lastName,
			phone: '',
			province: shippingInfo.province,
			zip: shippingInfo.zip,
			checkoutId: localStorage.getItem('checkout'),
		};
		//loop through inputs to create arrays for comparison
		for (let [key, value] of Object.entries(formData)) {
			const newItem = { [key]: value };
			compare1.push(newItem);
		}
		for (let [key, value] of Object.entries(necessaryShippingInfo)) {
			const newItem = { [key]: value };
			compare2.push(newItem);
		}
		//sort arrays to match
		const sorted1 = compare1.sort();
		const sorted2 = compare2.sort();
		//compare sorted arrays by converting to strings
		const compareArrays = sorted1.filter((item, i) => {
			return JSON.stringify(sorted2[i]) === JSON.stringify(item);
		});
		//if matches length is equivelant to the initial shipping info
		//no changes have been made, so it is unnecessary to send request
		return compareArrays.length === sorted2.length ? setChangedState(false) : setChangedState(true);
	};

	const formSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setAttempt(true);
		if (changes) await submitShippingInfo(formData, !shippingSaved);
	};

	useEffect(() => {
		checkForChanges();
	});

	return (
		<div className={style.form_container}>
			<div className={style.form_header}>
				<h2>Shipping Address Form</h2>
				<button onClick={() => toggleShippingModule(!shippingSaved)}>Cancel X</button>
			</div>
			<p>Currently, only shipping within the US</p>
			{alerts.length > 0
				? alerts.map((alert, i) => <StoreAlert status={alert.msg} type={alert.alertType} key={i} />)
				: null}
			{!changes && attempted ? <StoreAlert status={'No Changes Were Made'} type={'danger'} /> : null}
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
							<input
								type="text"
								value={province}
								name="province"
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
					<button onSubmit={(e) => formSubmit(e)}>Save Shipping Info</button>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	store: state.store,
	alerts: state.alerts,
});

export default connect(mapStateToProps, { submitShippingInfo, toggleShippingModule })(UpdateAddress);
