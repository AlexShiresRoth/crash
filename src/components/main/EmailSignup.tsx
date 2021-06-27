import React, { useState } from 'react';
import style from './EmailSignup.module.scss';
import { emailSignup } from '../../actions/email';
import { connect } from 'react-redux';
import Alert from '../alerts/Alert';
import LoadingSpinner from '../reusablecomps/LoadingSpinner';

interface Props {
	emailSignup: (val: any) => any;
	alerts?: any;
}

const EmailSignup = ({ emailSignup, alerts }: Props) => {
	console.log(alerts);

	const [data, setData] = useState({
		email: '',
	});
	const [loading, setLoading] = useState<any>(false);

	const [loaderStyle, setStyle] = useState<any>({
		color: '',
		height: '',
	});

	const { email } = data;

	const onChange = (e: React.FormEvent<HTMLInputElement>) =>
		setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setStyle({
			color: '#fff',
			size: '2rem',
		});
		setLoading(true);
		emailSignup(data);
		setTimeout(() => {
			setLoading(false);
			setData(() => ({ email: '' }));
		}, 3000);
	};

	return (
		<section className={style.box}>
			<div className={style.border_top}></div>
			<div className={style.container}>
				<img
					src={`https://res.cloudinary.com/snackmanproductions/image/upload/v1590510319/crash/Crash_the_Calm-white_tatrui.png`}
					alt="Crash the Calm Logo"
				/>
				<h2>Get in on exclusive content.</h2>
				{alerts.length > 0 ? <Alert /> : null}
				<form onSubmit={(e) => onSubmit(e)}>
					<div className={style.input_row}>
						<input
							type="email"
							name="email"
							value={email}
							onChange={(e) => onChange(e)}
							placeholder="Enter your email"
							required={true}
						/>
						{!loading ? (
							<button onSubmit={(e) => onSubmit(e)}>Join</button>
						) : (
							<LoadingSpinner updateStyle={loaderStyle} />
						)}
					</div>
				</form>
			</div>
		</section>
	);
};

const mapStateToProps = (state: any) => ({
	alerts: state.alerts,
});

export default connect(mapStateToProps, { emailSignup })(EmailSignup);
