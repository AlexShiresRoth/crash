import React, { useState } from 'react';
import style from './MobileNav.module.scss';
import { navLinks } from './navLinks';
import { logo } from '../svgs/logo';
import { NavLink } from 'react-router-dom';
import Cart from './cart/Cart';

const MobileNav = (props: any) => {
	const [menuOpen, toggleMenu] = useState<boolean>(false);

	const menu = navLinks.map((item) => {
		return (
			<NavLink to={item.path} key={item.id}>
				{item.name}
			</NavLink>
		);
	});

	return (
		<nav className={style.mobile_nav}>
			<div className={style.left}>
				<NavLink to="/main">{logo}</NavLink>
			</div>
			<div className={style.right}>
				<button className={style.menu} onClick={(e) => toggleMenu(!menuOpen)}>
					<span className={menuOpen ? style.rotated : ''}></span>
					<span className={menuOpen ? style.rotated : ''}></span>
					<span className={menuOpen ? style.rotated : ''}></span>
				</button>
			</div>
			<div className={menuOpen ? style.open : style.hidden}>
				{menu}
				<Cart />
			</div>
		</nav>
	);
};

export default MobileNav;
