import React, { useState } from 'react';
import style from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { logo } from '../svgs/logo';

export const Header = () => {
	const [reverse, setReverse] = useState(false);

	return (
		<header className={reverse ? `${style.header_reverse} ${style.header}` : style.header}>
			<div className={style.inner}>
				<div className={style.container}>
					<div className={style.box}>
						<div className={style.logo_box}>{logo}</div>
						<h1>Welcome To Nowhere.</h1>
						<p>a new album by crash the calm.</p>
						<NavLink to="/main">
							<button>enter</button>
						</NavLink>
					</div>
					<button onClick={() => setReverse(!reverse)} className={style.reverse_btn}>
						Reverse
					</button>
				</div>
				<div className={style.reverse_container}>
					<div className={style.box}>
						<div className={style.logo_box}>{logo}</div>
						<h1>Something different will go here</h1>
						<p>lorem ipsum dolor bagel</p>
						<NavLink to="/main">
							<button>enter</button>
						</NavLink>
					</div>
					<button onClick={() => setReverse(!reverse)} className={style.reverse_btn}>
						Reverse
					</button>
				</div>
			</div>
		</header>
	);
};
