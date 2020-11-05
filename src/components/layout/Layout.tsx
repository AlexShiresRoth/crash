import React, { useEffect, useState } from 'react';
import style from './Layout.module.scss';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';

interface Props {
	children: any;
}

const Layout = ({ children }: Props) => {
	const [hiddenElements, hideElement] = useState({
		footer: false,
		nav: false,
	});

	const { footer, nav } = hiddenElements;

	useEffect(() => {
		if (typeof window !== 'undefined') {
			console.log(window.location.href.includes('devils'));
			if (window.location.href.includes('devils')) {
				hideElement({ nav, footer: true });
			}
		}
	}, [footer, nav]);

	return (
		<main className={style.main}>
			<Nav />
			{children}
			{footer ? null : <Footer />}
		</main>
	);
};

export default Layout;
