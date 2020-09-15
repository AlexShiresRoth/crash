import React, { useEffect, useState } from 'react';
import style from './Nav.module.scss';
import { navLinks } from './navLinks';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { logo } from '../svgs/logo';
import Cart from './cart/Cart';
import { connect } from 'react-redux';
import { clearSearch } from '../../actions/store';
import MobileNav from './MobileNav';
import { TiSocialFacebook, TiSocialYoutube, TiSocialTwitter, TiSocialInstagram } from 'react-icons/ti';

interface NavProps {
	clearSearch: () => any;
}

type Props = RouteComponentProps & NavProps;

const Nav = ({ history, clearSearch }: Props) => {
	const [isScrolling, setScrolling] = useState(false);
	useEffect(() => {
		//if location is not the store then don't have the cart popup
		if (!history.location.pathname.includes('store')) {
			clearSearch();
		}
	}, [clearSearch, history.location.pathname]);

	useEffect(() => {
		window.addEventListener('scroll', () => setScrolling(() => window.pageYOffset > 0));
	}, []);

	return (
		<>
			<nav className={!isScrolling ? style.nav : `${style.nav} ${style.nav_scrolling}`}>
				<div className={style.left}>
					<NavLink to="/main">{logo}</NavLink>
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
				</div>

				<div className={style.right}>
					{navLinks.map((item) => {
						return (
							<NavLink to={item.path} key={item.id}>
								{item.name}
							</NavLink>
						);
					})}
					<Cart />
				</div>
			</nav>
			<MobileNav />
		</>
	);
};

export default connect(null, { clearSearch })(withRouter(Nav));
