import React from 'react';
import style from './MusicSection.module.scss';
import { sections } from './sections';
import { Link } from 'react-router-dom';
import { FaSpotify, FaApple, FaBandcamp } from 'react-icons/fa';
const MusicSection = () => {
	const section = sections.filter((section) => section.name === 'music')[0];
	return (
		<section className={style.box} key={section.id}>
			<div className={style.overlay}></div>
			<div className={style.heading}>
				<Link to={section.path}>listen On the streaming platform of your choosing</Link>
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
					<div className={style.iframe_container}>
						<div className={style.col}>
							<a
								href="https://crashthecalm.bandcamp.com/album/howve-you-been"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FaBandcamp />
								Listen on Bandcamp
							</a>
						</div>
						<iframe
							src="https://bandcamp.com/EmbeddedPlayer/album=533530733/size=large/bgcol=ffffff/linkcol=333333/tracklist=false/transparent=true/"
							seamless
							title="bandcamp"
							frameBorder="0"
						></iframe>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MusicSection;
