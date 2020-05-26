import React from 'react';
import PropTypes from 'prop-types';
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
						src={`https://res.cloudinary.com/snackmanproductions/image/upload/v1590510319/crash/Crash_the_Calm-white_tatrui.png`}
						alt="Crash the Calm Logo"
					/>
					Crash The Calm
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

Nav.propTypes = {};

export default Nav;
