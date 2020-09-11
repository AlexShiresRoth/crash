import React from 'react';
import style from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { logo } from '../svgs/logo';
import ReactPlayer from 'react-player/lazy';

export const Header = () => {
	return (
		<header className={style.header}>
			<ReactPlayer
				loop={true}
				controls={false}
				playing={true}
				muted={true}
				className={style.bg_video}
				height="100vh"
				width="100vw"
				playsinline={true}
				url="https://res.cloudinary.com/snackmanproductions/video/upload/v1597021662/crash/CTC-Lyric-Test-A_3_n70rxu.mp4"
			></ReactPlayer>
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
