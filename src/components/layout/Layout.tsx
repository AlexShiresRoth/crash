import React from 'react';
import style from './Layout.module.scss';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';

interface Props {
	children: any;
}

const Layout = ({ children }: Props) => {
	return (
		<main className={style.main}>
			<Nav />
			{children}
			<Footer />
		</main>
	);
};

export default Layout;
