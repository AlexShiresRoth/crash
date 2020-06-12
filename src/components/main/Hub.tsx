import React from 'react';
import PropTypes from 'prop-types';
import style from './Hub.module.scss';
import { sections } from './sections';
import { NavLink } from 'react-router-dom';
import MusicSection from './MusicSection';
import { Header } from './Header';
import VideoSection from './VideoSection';
import { InterviewsSection } from './InterviewsSection';
import { EmailSignup } from './EmailSignup';
const Hub = (props: any) => {
	return (
		<section className={style.main_container}>
			{/* <Header /> */}
			<MusicSection />
			<VideoSection />
			<InterviewsSection />
			<EmailSignup />
		</section>
	);
};

Hub.propTypes = {};

export default Hub;
