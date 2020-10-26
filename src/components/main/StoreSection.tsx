import React from 'react';
import { sections } from './sections';
import style from './StoreSection.module.scss';
import { Link } from 'react-router-dom';

const StoreSection = () => {
	const section = sections.filter((section) => section.name === 'merch')[0];

	return (
		<section className={style.box}>
			<Link to={section.path}>Shop Merch</Link>
			<div className={style.container}></div>
		</section>
	);
};

export default StoreSection;
