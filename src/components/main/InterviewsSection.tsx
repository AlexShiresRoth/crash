import React from 'react';
import { sections } from './sections';
import style from './InterviewsSection.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

interface Props {
	youtube?: any;
}

const InterviewsSection = ({ youtube: { videos, loading } }: Props) => {
	const section = sections.filter((section) => section.name === 'interviews')[0];

	return !loading ? (
		<section className={style.box}>
			<video muted loop autoPlay>
				<source src={require('../videos/lamp.mp4')} type="video/mp4" />
			</video>
			<div className={style.overlay}></div>
			<Link to={section.path}>Interviews/Behind the Scenes</Link>
		</section>
	) : (
		<p>Loading...</p>
	);
};

const mapStateToProps = (state: any) => {
	return {
		youtube: state.youtube,
	};
};

export default connect(mapStateToProps, null)(InterviewsSection);
