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
			<section className={style.section + ' ' + style.worn_bg}>
				<div className={style.overlay}></div>
				<div className={style.text_container}>
					<p>
						<em>
							Tell me what I’m running from, where I’m going...where should I lay my head at night? What
							can I do to dull these voices scraping on my inside?
						</em>
					</p>
					<p>
						<strong>
							He approaches the shadows in his room. I wonder how he can sleep so easily. The pastor’s
							words are fallacy. Why do I only see hell? Did I miss all the holy days, creating internal
							wars? Destroying ourselves, the earth and the ground. -Clifford
						</strong>
					</p>
					<p>
						<em>
							Nothing ever changes, we all just stay the same We preach what we believe in, then don’t do
							a goddamn thing
						</em>
					</p>
					<p>
						<strong>
							With every critical thought being overrun with hate, anger is drawing towards the pastor,
							who led his sheep to the slaughter. -The Dirt
						</strong>
					</p>
					<p>
						<em>
							Don’t mislead me with a sermon because your words are meaningless Between the lines that you
							are quoting was a message misinterpreted
						</em>
					</p>
					<p>
						<strong>
							Shouting into the night, Clifford wakes his lone neighbor. Angered now by the reality of his
							life, which is forever altered. His friends and world are devils in disguise. -Clifford
						</strong>
					</p>
					<p>
						<em>
							And you can’t see the storm below the sea And you can’t shake that man from his belief And
							you think you know everything Forever more never knocking on god’s door
						</em>
					</p>
					<p>
						<strong>
							If there is nothing left to believe in, let's burn ourselves to the ground, from the likes
							of fire which we use to seek light. -George
						</strong>
					</p>
					<p>
						<strong>
							Looking towards the pastor, mocking his faith, mocking the light. His daughter’s death has
							undermined his cause. -Clifford
						</strong>
					</p>
					<p>
						<strong>
							Clifford will never make peace with the demons and does not want a truce. I am no pastor; I
							am a grand pessimist. I’ve seen the worst of humanity. -George
						</strong>
					</p>
					<p>
						<em>
							We all want to be a savior but this world will nail you down So why don’t you pull out all
							the splinters and find yourself a better crown
						</em>
					</p>
					<p>
						<strong>
							The pastor seated in his room is waging the same battle as Clifford. The pastor’s wife
							(Eleanor’s mother) died when Eleanor was young of the Spanish flu like many of the residents
							of Nowhere. He raised Eleanor on faith and hard work because that’s all he knows. -Pastor
						</strong>
					</p>
					<p>
						<em>
							What becomes of all our ash when there’s no more soul to hold? Can you shake out all your
							fears, all the troubles and the unknowns?
						</em>
					</p>
					<p>
						<strong>
							The shadows in the room are now antagonizing the pastor. Is he a pastor or a devil too?
							Witnessing the destruction of his generation; his life destroyed by outside forces. He has
							no one and no one else to turn to but divine intervention. The same mentality of hope that
							has left us barren. -The Dust & Dirt
						</strong>
					</p>
					<p>
						<strong>The loss of hope cursing fathers, sons, mothers and daughters. -George</strong>
					</p>
					<p>
						<strong>We are the soulless ghosts, the ones that remain… -Clifford</strong>
					</p>
					<p>
						<em>
							All the words we wasted on you, prophets nothing more than words Tell your god I’m not
							appealing Forevermore, knocking on your door
						</em>
					</p>
					<p>
						<strong>
							In the dust and dirt and chaos that ensued, we lost sight of the pain that is shared amongst
							all of us. Trapped in our houses by the dust storms that never relent. We are all separated
							by our own arrogance. -Clifford
						</strong>
					</p>
					<p>
						<em>
							And you can’t see the storm below the sea And you can’t shake that man from his belief And
							you think you know everything Forever more never knocking on god’s door
						</em>
					</p>
					<p>
						<strong>
							If we give up on hope, then we all will scatter. Just like everything that once made us
							whole, we continue to plant the seeds of our own destruction… -Clifford
						</strong>
					</p>
				</div>
			</section>
		</>
	);
};

export default SingleComponent;
