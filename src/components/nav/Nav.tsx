import React from 'react';
import style from './Nav.module.scss';
import { navLinks } from './navLinks';
import { NavLink } from 'react-router-dom';
import { logo } from '../svgs/logo';

const Nav = (props: any) => {
	return (
		<nav className={style.nav}>
			<div className={style.left}>
				<NavLink to="/main">{logo}</NavLink>
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
