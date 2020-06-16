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
				<div className={style.imgs}>
					<img
						src={
							'https://res.cloudinary.com/snackmanproductions/image/upload/c_scale,q_63,w_650/v1591992252/crash/crash-split_ux42mr.jpg'
						}
						alt="album"
					/>
					<img
						src={`https://res.cloudinary.com/snackmanproductions/image/upload/c_scale,q_65,w_650/v1591992250/crash/crash-record_g3l2e2.jpg`}
						alt="album"
					/>
				</div>
			</div>
		</section>
	);
};

export default MusicSection;
