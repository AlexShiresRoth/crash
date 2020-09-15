import React, { createRef, useState, useEffect } from 'react';
import style from './VideoSection.module.scss';
import { sections } from './sections';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchVideos } from '../../actions/youtube';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Props {
	fetchVideos: () => any;
	youtube: {
		videos: any;
		loading: boolean;
	};
}
const VideoSection = ({ fetchVideos, youtube: { videos, loading } }: Props) => {
	useEffect(() => {
		fetchVideos();
	}, [fetchVideos]);

	const section = sections.filter((section) => section.name === 'videos')[0];
	const videoRef = createRef<HTMLDivElement>();
	const videoContainerRef = createRef<HTMLDivElement>();

	const [currentIndex, setIndex] = useState(0);
	const [videoWidth, setVideoWidth] = useState(0);
	const [scrollWidth, setScrollWidth] = useState(0);

	useEffect(() => {
		if (videoRef.current) setVideoWidth(videoRef.current.getBoundingClientRect().width);
	}, [videoRef]);

	useEffect(() => {
		const handleResize = () => {
			setIndex(0);
			if (videoContainerRef.current) videoContainerRef.current.style.transform = `translate3d(0px, 0,0)`;
			//need to fix width adjustment on resize
		};
		window.addEventListener('resize', () => handleResize());
	}, [videoRef, videoContainerRef]);

	const handleIndexChange = (val: any) => {
		const min = 0;
		const max = videos.filter((video: any) => video.id.videoId !== undefined).length - 1;

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
		const handleScroll = () => {
			if (videoRef.current && videoContainerRef.current) {
				videoContainerRef.current.style.transform = `translate3d(${scrollWidth}px, 0,0)`;
			}
		};
		handleScroll();
	}, [currentIndex, scrollWidth, videoContainerRef, videoRef]);

	//url for youtube embed
	const videoSource = `https://www.youtube.com/embed/`;

	console.log(currentIndex);
	return !loading && videos.length > 0 ? (
		<section className={style.box} key={section.id}>
			<Link to={section.path}>Watch all music videos/interviews</Link>
			<div className={style.wide_box}>
				<button onClick={() => handleIndexChange(null)}>
					<FaChevronLeft />
				</button>
				<div className={style.video_grid} ref={videoRef}>
					<div className={style.videos} ref={videoContainerRef}>
						{videos
							.filter((video: any) => video.id.videoId !== undefined)
							.map((video: any, i: number) => {
								return (
									<div className={style.video_container} key={i}>
										<iframe title="Video" src={videoSource + video.id.videoId} frameBorder="0" />
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
