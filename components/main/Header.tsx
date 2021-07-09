import React from 'react';
import style from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
	const logo =
		'https://res.cloudinary.com/snackmanproductions/image/upload/v1592331145/crash/CTC_Logo_Export_n4ra8j.png';
	return (
		<header className={style.header}>
			<div className={style.img_container}>
				<Image src={logo} height="100px" width="600px" alt="Crash the Calm Logo" />
			</div>
			<div className={style.actions}>
				<Link href="/music">Listen</Link>
				<span>|</span>
				<Link href="/videos">Watch</Link>
				<span>|</span>
				<Link href="/tour">Tour</Link>
			</div>
		</header>
	);
};
