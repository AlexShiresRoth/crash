import React from 'react';
import { sections } from './sections';
import style from './InterviewsSection.module.scss';
import { Link } from 'react-router-dom';

export const InterviewsSection = () => {
	const section = sections.filter((section) => section.name === 'interviews')[0];
	return (
		<section className={style.box} key={section.id}>
			<Link to={section.path}>Interviews/Behind the Scenes</Link>
		</section>
	);
};
