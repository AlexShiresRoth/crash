import React from 'react';
// import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/lazy';
import { Link } from 'react-router-dom';
import style from './SingleComponent.module.scss';

const SingleComponent = (props: any) => {
	return (
		<section className={style.section}>
			<div className={style.video_container}>
				<h2>Watch The "Devils" Single Lyric video</h2>
				<ReactPlayer url="https://youtu.be/xrJNa0Z5Rp8" width={`100%`} height={`100%`} allowFullscreen={true} />
			</div>
			<div className={style.img_container}>
				<Link to="/store">Shop "Devils" Merch</Link>
				<div className={style.bg_img}>
					<Link to="/store"></Link>
				</div>
			</div>
		</section>
	);
};

// SingleComponent.propTypes = {};

export default SingleComponent;
