import React from 'react';
// import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/lazy';
import style from './SingleComponent.module.scss';

const SingleComponent = (props: any) => {
	return (
		<section className={style.section}>
			<div className={style.video_container}>
				<ReactPlayer url="https://youtu.be/xrJNa0Z5Rp8" width={`100%`} height={`100%`} />
			</div>
			<div className={style.img_container}>
				<img
					src="https://res.cloudinary.com/snackmanproductions/image/upload/v1602463223/crash/devilsartwork-notext_f3v5vd.jpg"
					alt="devils merch"
				/>
			</div>
		</section>
	);
};

// SingleComponent.propTypes = {};

export default SingleComponent;
