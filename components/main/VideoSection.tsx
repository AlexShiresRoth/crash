import React, {
  createRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import style from "./VideoSection.module.scss";
import { sections } from "./sections";
import Link from "next/link";
import { connect } from "react-redux";
import { fetchVideos } from "../../redux/actions/youtube";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPlayer from "react-player/lazy";
import LoadingSpinner from "../reusablecomps/LoadingSpinner";

//TODO FIX THIS FUCKING PIECE OF SHIT SCROLLING PROBLEM THAT'S ALWAYS FUCKING RANDOM YOU FUCKIN GGARBAGE DEVELOPER
interface Props {
  fetchVideos: (val: number) => any;
  youtube: {
    videos: any;
    loading: boolean;
  };
}
const VideoSection = ({ fetchVideos, youtube: { videos, loading } }: Props) => {
  const section = sections.filter((section) => section.name === "videos")[0];
  const videoRef = createRef<HTMLDivElement>();
  const videoContainerRef = createRef<HTMLDivElement>();

  const [currentIndex, setIndex] = useState<number>(0);
  const [videoWidth, setVideoWidth] = useState<number>(0);
  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const [maxScroll, setMaxScroll] = useState<number>(0);
  const maxVideos = 7;

  //Set initial width on component load
  useEffect(() => {
    if (videoRef.current) setVideoWidth(videoRef.current.clientWidth);
  }, [videoRef]);

  useEffect(() => {
    if (videoContainerRef.current) {
      setMaxScroll(videoContainerRef.current.scrollWidth);
    }
  }, [videoContainerRef]);

  //Handle resize by reverting index to first video
  //Then the video width needs to be reset to window size scaling
  useEffect(() => {
    const handleResize = () => {
      setIndex(0);
      setScrollWidth(0);
      if (videoRef.current !== null)
        setVideoWidth(videoRef.current.clientWidth);
    };
    window.addEventListener("resize", () => handleResize());

    return () => window.removeEventListener("resize", () => handleResize());
  }, [videoRef]);

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
    //if scrolling width grows past max width of container, reset everything
    if (Math.abs(scrollWidth) > maxScroll) {
      setIndex(0);
      setScrollWidth(0);
    }
  }, [scrollWidth, videoWidth, maxScroll]);

  console.log(
    "scrollwith",
    scrollWidth,
    maxScroll,
    videoWidth,
    videoContainerRef.current?.scrollLeft
  );

  useMemo(() => {
    fetchVideos(maxVideos);
  }, [fetchVideos]);

  useEffect(() => {
    setScrollWidth(0);
  }, []);

  //url for youtube embed
  const videoSource = `https://www.youtube.com/watch?v=`;

  if (loading) {
    return <LoadingSpinner />;
  }
  if (videos.length === 0) {
    return <p>Could not load videos</p>;
  }

  return (
    <section className={style.box} key={section.id}>
      <div className={style.link_container}>
        <Link href={section.path}>Watch all music videos</Link>
      </div>
      <div className={style.wide_box}>
        <button onClick={() => handleIndexChange(null)}>
          <FaChevronLeft />
        </button>
        <div className={style.video_grid} ref={videoRef}>
          <div
            className={style.videos}
            ref={videoContainerRef}
            style={{ transform: `translate3d(${scrollWidth}px, 0, 0)` }}
          >
            {videos.map((video: any, i: number) => {
              return (
                <div className={style.video_container} key={i}>
                  <ReactPlayer
                    url={videoSource + video.snippet.resourceId.videoId}
                    width="100%"
                    height="100%"
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
  );
};

const mapStateToProps = (state: any) => {
  return {
    youtube: state.youtube,
  };
};

export default connect(mapStateToProps, { fetchVideos })(VideoSection);
