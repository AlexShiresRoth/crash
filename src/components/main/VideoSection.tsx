import React, { createRef, useState, useEffect } from 'react';
import style from './VideoSection.module.scss';
import { sections } from './sections';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchVideos } from '../../actions/youtube';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ReactPlayer from 'react-player/lazy';

interface Props {
	fetchVideos: (val: number) => any;
	youtube: {
		videos: any;
		loading: boolean;
	};
}
const VideoSection = ({ fetchVideos, youtube: { videos, loading } }: Props) => {
	useEffect(() => {
		fetchVideos(5);
	}, [fetchVideos]);

	const section = sections.filter((section) => section.name === 'videos')[0];
	const videoRef = createRef<HTMLDivElement>();
	const videoContainerRef = createRef<HTMLDivElement>();

	const [currentIndex, setIndex] = useState(0);
	const [videoWidth, setVideoWidth] = useState(0);
	const [scrollWidth, setScrollWidth] = useState(0);

	//Set initial width on component load
	useEffect(() => {
		if (videoRef.current) setVideoWidth(videoRef.current.getBoundingClientRect().width);
	}, [videoRef]);

	//Handle resize by reverting index to first video
	//Then the video width needs to be reset to window size scaling
	useEffect(() => {
		const handleResize = () => {
			setIndex(0);
			if (videoContainerRef.current !== null) videoContainerRef.current.style.transform = `translate3d(0px,0,0)`;
			if (videoRef.current !== null) setVideoWidth(videoRef.current.getBoundingClientRect().width);
		};
		window.addEventListener('resize', () => handleResize());

		return () => window.removeEventListener('resize', () => handleResize());
	}, [videoRef, videoContainerRef]);

	//once video width is updated, update scroll width
	useEffect(() => {
		const max = videos.length - 1;
		if (videoWidth) setScrollWidth(-(max * videoWidth));
	}, [videoWidth, videos.length]);

	const handleIndexChange = (val: any) => {
		const min = 0;
		const max = videos.length - 1;
		if (val) {
			if (currentIndex >= max) {
				setIndex(min);
				setScrollWidth(0);
				return;
			}
			setIndex((prevState) => prevState + 1);
			setScrollWidth((prevState) => prevState - videoWidth);
		}
		if (!val) {
			if (currentIndex <= min) {
				setIndex(max);
				setScrollWidth(-(max * videoWidth));
				return;
			}
			setIndex((prevState) => prevState - 1);
			setScrollWidth((prevState) => prevState + videoWidth);
		}
	};

	useEffect(() => {
		const max = videos.length - 1;
		if (videoRef.current && videoContainerRef.current) {
			videoContainerRef.current.style.transform = `translate3d(${scrollWidth}px, 0,0)`;

			//if scrolling width grows past max width of container, reset everything
			if (-scrollWidth > max * videoWidth) {
				videoContainerRef.current.style.transform = `translate3d(0px, 0,0)`;
				setIndex(0);
				setScrollWidth(0);
			}
		}
	}, [currentIndex, scrollWidth, videoContainerRef, videoRef, videos.length, videoWidth]);

	//url for youtube embed
	const videoSource = `https://www.youtube.com/watch?v=`;

	return !loading && videos.length > 0 ? (
		<section className={style.box} key={section.id}>
			<div className={style.border_top}></div>
			<div className={style.border_bottom}></div>
			<div className={style.link_container}>
				<Link to={section.path}>Watch all music videos</Link>
			</div>
			<div className={style.wide_box}>
				<button onClick={() => handleIndexChange(null)}>
					<FaChevronLeft />
				</button>
				<div className={style.video_grid} ref={videoRef}>
					<div className={style.videos} ref={videoContainerRef}>
						{videos.map((video: any, i: number) => {
							return (
								<div className={style.video_container} key={i}>
									<ReactPlayer
										url={videoSource + video.snippet.resourceId.videoId}
										width={'100%'}
										height={'100%'}
									/>
								</div>
							);
						})}
					</div>
				</div>
				<button onClick={() => handleIndexChange(1)}>
					<FaChevronRight />
				</button>
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
