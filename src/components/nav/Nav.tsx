import React, { useEffect, useState } from 'react';
import style from './Nav.module.scss';
import { navLinks } from './navLinks';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { logo } from '../svgs/logo';
import Cart from './cart/Cart';
import { connect } from 'react-redux';
import { clearSearch } from '../../actions/store';
import MobileNav from './MobileNav';

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
	console.log(isScrolling);
	return (
		<>
			<nav className={!isScrolling ? style.nav : `${style.nav} ${style.nav_scrolling}`}>
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
					<Cart />
				</div>
			</nav>
			<MobileNav />
		</>
	);
};

export default connect(null, { clearSearch })(withRouter(Nav));
