import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/lazy';
import { Link } from 'react-router-dom';
import MusicSection from '../main/MusicSection';
import style from './SingleComponent.module.scss';

const SingleComponent = (props: any) => {
	const [overlayVisible, toggleOverlay] = useState(true);

	return (
		<>
			<div className={overlayVisible ? style.overlay : style.hidden}>
				<div className={style.inner}>
					<img
						src={`https://res.cloudinary.com/snackmanproductions/image/upload/v1603506986/crash/Untitled_Artwork_ri6ybz.png`}
						alt="devils"
					/>
					<button onClick={(e) => toggleOverlay(!overlayVisible)}>Enter</button>
				</div>
			</div>
			<section className={style.section}>
				<div className={style.video_container}>
					<h2>Watch The "Devils" Single Lyric video</h2>
					<ReactPlayer
						url="https://youtu.be/xrJNa0Z5Rp8"
						width={`100%`}
						height={`100%`}
						allowFullscreen={true}
					/>
				</div>
				{/* Make reusable for single */}
				<MusicSection />
				<div className={style.img_container}>
					<Link to="/store">Shop "Devils" Merch</Link>
					<div className={style.bg_img}>
						<Link to="/store"></Link>
					</div>
				</div>
			</section>
		</>
	);
};

// SingleComponent.propTypes = {};

export default SingleComponent;
