import React from 'react';
import style from './Header.module.scss';
import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<header className={style.header}>
			<div className={style.overlay}></div>
			<img
				src={`https://res.cloudinary.com/snackmanproductions/image/upload/v1592331145/crash/CTC_Logo_Export_n4ra8j.png`}
				alt="Crash the Calm Logo"
			/>
			<Link to="/tour">
				<button>Tour Dates</button>
			</Link>
		</header>
	);
};
