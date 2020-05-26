import React from 'react';
import PropTypes from 'prop-types';
import style from './Hub.module.scss';
import { sections } from './sections';
import { NavLink } from 'react-router-dom';
const Hub = (props: any) => {
	return (
		<section className={style.main_container}>
			{sections.map((section) => {
				return (
					<div className={style.box} key={section.id}>
						<img src={section.img} alt={section.name} />
						<NavLink to={section.path}>
							<button>{section.name}</button>
						</NavLink>
					</div>
				);
			})}
		</section>
	);
};

Hub.propTypes = {};

export default Hub;
