import React from 'react';
import { sections } from './sections';
import style from './StoreSection.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

interface Props {
	youtube?: any;
}

const StoreSection = () => {
	const section = sections.filter((section) => section.name === 'store')[0];

	return (
		<section className={style.box}>
			<video muted loop autoPlay>
				<source src={require('../videos/lamp.mp4')} type="video/mp4" />
			</video>
			<div className={style.overlay}></div>
			<Link to={section.path}>Shop Merch</Link>
		</section>
	);
};

const mapStateToProps = (state: any) => {
	return {
		youtube: state.youtube,
	};
};

export default connect(mapStateToProps, null)(StoreSection);
