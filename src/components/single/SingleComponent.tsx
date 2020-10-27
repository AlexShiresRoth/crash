import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/lazy';
import { Link } from 'react-router-dom';
import { FaSpotify, FaApple } from 'react-icons/fa';
import style from './SingleComponent.module.scss';

const SingleComponent = () => {
	const [overlayVisible, toggleOverlay] = useState(true);

	useEffect(() => {
		const body = document.querySelector('html');
		if (overlayVisible) {
			if (typeof window !== 'undefined') {
				if (body !== null) body.style.overflow = 'hidden';
			}
		} else {
			if (body !== null) body.style.overflow = 'auto';
		}
	}, [overlayVisible]);
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
					<h2>Devils, a Motion Picture by Crash the Calm</h2>
					<ReactPlayer
						url="https://youtu.be/xrJNa0Z5Rp8"
						width={`100%`}
						height={`100%`}
						allowFullscreen={true}
					/>
				</div>
				<section className={style.box}>
					<div className={style.heading}>
						<p>Download or Stream Here</p>
					</div>
					<div className={style.grid}>
						<div className={style.embeds}>
							<div className={style.iframe_container}>
								<div className={style.col}>
									<a
										href="https://open.spotify.com/artist/4z0T4u61g7AUCjxoygPCAT?si=3ZGMARQNSIi5YrgRc8w_pQ"
										rel="noopener noreferrer"
										target="_blank"
									>
										<FaSpotify />
										Listen on Spotify
									</a>
								</div>
								<iframe
									title="spotify embed"
									src="https://open.spotify.com/embed/artist/4z0T4u61g7AUCjxoygPCAT"
									frameBorder="0"
									allow="encrypted-media"
								></iframe>
							</div>
							<div className={style.iframe_container}>
								<div className={style.col}>
									<a
										href="https://music.apple.com/us/album/howve-you-been/1234046324?app=music"
										rel="noopener noreferrer"
										target="_blank"
									>
										<FaApple />
										Listen on Apple Music
									</a>
								</div>
								<iframe
									title="apple music"
									allow="autoplay *; encrypted-media *;"
									frameBorder="0"
									style={{ overflow: 'hidden', borderRadius: '0px' }}
									sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
									src="https://embed.music.apple.com/us/album/howve-you-been/1234046324?app=music"
								></iframe>
							</div>
						</div>
					</div>
				</section>
				<div className={style.img_container}>
					<Link to="/merch">Shop "Devils" Merch</Link>
					<div className={style.bg_img}>
						<Link to="/merch"></Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default SingleComponent;
