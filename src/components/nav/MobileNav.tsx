import React, { useState } from 'react';
import style from './MobileNav.module.scss';
import { navLinks } from './navLinks';
import { logo } from '../svgs/logo';
import { NavLink } from 'react-router-dom';
import Cart from './cart/Cart';
import { TiSocialFacebook, TiSocialYoutube, TiSocialTwitter, TiSocialInstagram } from 'react-icons/ti';

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
				<div className={style.menu} onClick={(e) => toggleMenu(!menuOpen)}>
					<span className={menuOpen ? style.rotated : ''}></span>
					<span className={menuOpen ? style.rotated : ''}></span>
					<span className={menuOpen ? style.rotated : ''}></span>
				</div>
			</div>
			<div className={menuOpen ? style.open : style.hidden}>
				<div className={style.social}>
					<a href=" http://facebook.com/crashthecalmband" rel="noopener noreferrer" target="_blank">
						<TiSocialFacebook />
					</a>
					<a
						href="http://youtube.com/channel/UCAEhEbQ5bgCoyCDWczfmuyA"
						rel="noopener noreferrer"
						target="_blank"
					>
						<TiSocialYoutube />
					</a>
					<a href="http://twitter.com/crashthecalmny" rel="noopener noreferrer" target="_blank">
						<TiSocialTwitter />
					</a>
					<a href="http://instagram.com/crashthecalmny" rel="noopener noreferrer" target="_blank">
						<TiSocialInstagram />
					</a>
				</div>
				{menu}
				<Cart />
			</div>
		</nav>
	);
};

export default MobileNav;
