import React from 'react';
import style from './EmailSignup.module.scss';

export const EmailSignup = () => {
	return (
		<section className={style.box}>
			<div className={style.container}>
				<img
					src={`https://res.cloudinary.com/snackmanproductions/image/upload/v1590510319/crash/Crash_the_Calm-white_tatrui.png`}
					alt="Crash the Calm Logo"
				/>
				<h2>Get in on exclusive content.</h2>
				<form>
					<div className={style.input_row}>
						<input type="text" name="signup" placeholder="Enter your email" />
						<button>Join</button>
					</div>
				</form>
			</div>
		</section>
	);
};
