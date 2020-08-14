import React, { useState } from 'react';
import style from './EmailSignup.module.scss';
import { emailSignup } from '../../actions/email';
import { connect } from 'react-redux';

interface Props {
	emailSignup: (val: any) => any;
}

const EmailSignup = ({ emailSignup }: Props) => {
	const [data, setData] = useState({
		email: '',
	});

	const { email } = data;

	const onChange = (e: React.FormEvent<HTMLInputElement>) =>
		setData({ ...data, [e.currentTarget.name]: e.currentTarget.value });

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		emailSignup(data);
	};

	return (
		<section className={style.box}>
			<div className={style.container}>
				<img
					src={`https://res.cloudinary.com/snackmanproductions/image/upload/v1590510319/crash/Crash_the_Calm-white_tatrui.png`}
					alt="Crash the Calm Logo"
				/>
				<h2>Get in on exclusive content.</h2>
				<form onSubmit={(e) => onSubmit(e)}>
					<div className={style.input_row}>
						<input
							type="email"
							name="email"
							value={email}
							onChange={(e) => onChange(e)}
							placeholder="Enter your email"
						/>
						<button onSubmit={(e) => onSubmit(e)}>Join</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default connect(null, { emailSignup })(EmailSignup);
