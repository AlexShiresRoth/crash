import React from 'react';
import PropTypes from 'prop-types';
import style from './Nav.module.scss';
import { navLinks } from './navLinks';
import { NavLink } from 'react-router-dom';
import { AudioPlayer } from '../reusablecomps/AudioPlayer';

const Nav = (props: any) => {
	return (
		<nav className={style.nav}>
			<div className={style.left}>//logo</div>
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
