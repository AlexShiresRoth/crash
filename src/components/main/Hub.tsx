import React from 'react';
import style from './Hub.module.scss';
import MusicSection from './MusicSection';
import { Header } from './Header';
import VideoSection from './VideoSection';
import { EmailSignup } from './EmailSignup';
import StoreSection from './StoreSection';
import TourSections from './TourSections';
const Hub = (props: any) => {
	return (
		<section className={style.main_container}>
			<Header />
			<MusicSection />
			<VideoSection />
			<TourSections />
			<StoreSection />
			<EmailSignup />
		</section>
	);
};

export default Hub;
