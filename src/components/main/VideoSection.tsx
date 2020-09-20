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
	const [filteredVideos, filterVideos] = useState([]);
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
		const max = filterVideos.length - 1;
		setScrollWidth(-(max * videoWidth));
	}, [videoWidth]);

	const handleIndexChange = (val: any) => {
		const min = 0;
		const max = filteredVideos.length - 1;

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

	useEffect(() => {
		if (videos.length > 0) filterVideos(videos.filter((video: any) => video.id.videoId !== undefined));
	}, [videos]);
	//url for youtube embed
	const videoSource = `https://www.youtube.com/embed/`;

	console.log(videoWidth, scrollWidth);
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
