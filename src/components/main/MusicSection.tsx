import React from 'react';
import style from './MusicSection.module.scss';
import { sections } from './sections';
import { Link } from 'react-router-dom';

const MusicSection = () => {
	const section = sections.filter((section) => section.name === 'music')[0];
	return (
		<section className={style.box} key={section.id}>
			<div className={style.overlay}></div>
			<div className={style.grid}>
				<Link to={section.path}>explore music</Link>
				<div className={style.embeds}>
					<iframe
						title="spotify embed"
						src="https://open.spotify.com/embed/artist/4z0T4u61g7AUCjxoygPCAT"
						width="300"
						height="380"
						frameBorder="0"
						allowTransparency={true}
						allow="encrypted-media"
					></iframe>
				</div>
			</div>
		</section>
	);
};

export default MusicSection;
