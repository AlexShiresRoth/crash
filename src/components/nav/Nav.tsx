import React from 'react';
import style from './Nav.module.scss';
import { navLinks } from './navLinks';
import { NavLink } from 'react-router-dom';
import { AudioPlayer } from '../reusablecomps/AudioPlayer';

const Nav = (props: any) => {
	return (
		<nav className={style.nav}>
			<div className={style.left}>
				<NavLink to="/">
					<img
						src={`https://res.cloudinary.com/snackmanproductions/image/upload/v1592331145/crash/CTC_Logo_Export_n4ra8j.png`}
						alt="Crash the Calm Logo"
					/>
				</NavLink>
			</div>
			<div className={style.center}>
				<AudioPlayer />
			</div>
			<div className={style.right}>
				{navLinks.map((item) => {
					return (
						<NavLink to={item.path} key={item.id}>
							{item.name}
						</NavLink>
					);
				})}
			</div>
		</nav>
	);
};

export default Nav;
