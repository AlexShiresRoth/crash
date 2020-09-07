import React, { useRef, useEffect } from 'react';
import style from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { logo } from '../svgs/logo';

export const Header = () => {
	const videoRef = useRef<any>(null);

	useEffect(() => {
		console.log(videoRef.current.attributes);
		if (videoRef.current !== null) {
			videoRef.current.setAttribute('muted', '');
			videoRef.current.setAttribute('autoPlay', '');
			videoRef.current.play();
		}
	}, []);

	if (videoRef.current) console.log(videoRef.current.style);
	return (
		<header className={style.header}>
			<video loop autoPlay playsInline className={style.bg_video} ref={videoRef}>
				<source
					src="https://res.cloudinary.com/snackmanproductions/video/upload/v1597021662/crash/CTC-Lyric-Test-A_3_n70rxu.mp4"
					type="video/mp4"
				></source>
			</video>
			<div className={style.inner}>
				<div className={style.container}>
					<div className={style.box}>
						<div className={style.logo_box}>{logo}</div>
						<h1>Welcome To Nowhere.</h1>
						<p>a new album by crash the calm.</p>
						<NavLink to="/main">
							<button>enter</button>
						</NavLink>
					</div>
				</div>
			</div>
		</header>
	);
};
