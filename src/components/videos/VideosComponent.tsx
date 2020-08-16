import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllvideos } from '../../actions/youtube';
import style from './VideosComponent.module.scss';
import LoadingSpinner from '../reusablecomps/LoadingSpinner';

interface Props {
	youtube?: any;
	fetchAllvideos: () => any;
}

const VideosComponent = ({ youtube: { videos, loading }, fetchAllvideos }: Props) => {
	//url for youtube embed
	const videoSource = `https://www.youtube.com/embed/`;

	useEffect(() => {
		fetchAllvideos();
	}, [fetchAllvideos]);

	const videosArr = videos.map((video: any, i: number) => {
		return (
			<div className={style.video_container} key={i}>
				<iframe title="Video" src={videoSource + video.id.videoId} frameBorder="0" allowFullScreen />
			</div>
		);
	});

	return (
		<section className={style.section}>
			<div className={style.video_grid}>{!loading ? videosArr : <LoadingSpinner />}</div>
		</section>
	);
};

const mapStateToProps = (state: any) => ({
	youtube: state.youtube,
});

export default connect(mapStateToProps, { fetchAllvideos })(VideosComponent);
