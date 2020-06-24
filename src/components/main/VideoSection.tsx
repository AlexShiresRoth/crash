import React, { useEffect } from 'react';
import style from './VideoSection.module.scss';
import { sections } from './sections';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchVideos } from '../../actions/youtube';

interface Props {
	fetchVideos: () => any;
	youtube: {
		videos: any;
		loading: boolean;
	};
}
const VideoSection = ({ fetchVideos, youtube: { videos, loading } }: Props) => {
	const section = sections.filter((section) => section.name === 'videos')[0];

	useEffect(() => {
		fetchVideos();
	}, [fetchVideos]);
	//figure out how to get actual videos

	//url for youtube embed
	const videoSource = `https://www.youtube.com/embed/`;

	return !loading && videos.length > 0 ? (
		<section className={style.box} key={section.id}>
			<Link to={section.path}>Watch all music videos/interviews</Link>
			<div className={style.video_grid}>
				{videos
					.map((video: any, i: number) => {
						return (
							<div className={style.video_container} key={i}>
								<iframe title="Video" src={videoSource + video.id.videoId} frameBorder="0" />
							</div>
						);
					})
					.slice(1, 3)}
			</div>
		</section>
	) : (
		<p>Loading...</p>
	);
};

const mapStateToProps = (state: any) => {
	return {
		youtube: state.youtube,
	};
};

export default connect(mapStateToProps, { fetchVideos })(VideoSection);
