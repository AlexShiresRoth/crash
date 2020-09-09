import React from 'react';
import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';

export const Header = () => {
	return (
		<header className={style.header}>
			<ReactPlayer
				url={require('../videos/lamp.mp4')}
				muted={true}
				loop={true}
				playing={true}
				height="auto"
				width="100vw"
				style={{ position: 'absolute', top: '0', left: '0', minWidth: '1500px' }}
			></ReactPlayer>
			<div className={style.overlay}></div>
			<div className={style.img_container}>
				<img
					src={`https://res.cloudinary.com/snackmanproductions/image/upload/v1592331145/crash/CTC_Logo_Export_n4ra8j.png`}
					alt="Crash the Calm Logo"
				/>
			</div>
			<div className={style.actions}>
				<Link to="/music">Listen</Link>
				<span>|</span>
				<Link to="/videos">Watch</Link>
				<span>|</span>
				<Link to="/tour">Tour</Link>
			</div>
		</header>
	);
};
