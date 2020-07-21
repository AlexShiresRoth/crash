import React from 'react';
import style from './Nav.module.scss';
import { navLinks } from './navLinks';
import { NavLink } from 'react-router-dom';
import { logo } from '../svgs/logo';
import Cart from './cart/Cart';
import { connect } from 'react-redux';
import { clearSearch } from '../../actions/store';

interface Props {
	clearSearch: () => any;
}

const Nav = ({ clearSearch }: Props) => {
	// useEffect(() => {
	// 	//if location is not the store then don't have the cart popup
	// 	if (!history.location.pathname.includes('store')) clearSearch();
	// }, []);

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
				<Cart />
			</div>
		</nav>
	);
};

//TODO fix withRouter error need to add routeProps
// export default connect(null, { clearSearch })(withRouter(Nav));
export default connect(null, { clearSearch })(Nav);
