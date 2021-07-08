import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchVideos } from "../../redux/actions/youtube";
import style from "./VideosComponent.module.scss";
import LoadingSpinner from "../reusablecomps/LoadingSpinner";
import ReactPlayer from "react-player/lazy";

interface Props {
  youtube?: any;
  fetchVideos: (val: number) => any;
}

const VideosComponent = ({
  youtube: { videos, loading },
  fetchVideos,
}: Props) => {
  //url for youtube embed
  const videoSource = `https://www.youtube.com/watch?v=`;

  useEffect(() => {
    fetchVideos(20);
  }, [fetchVideos]);

  const videosArr = videos.map((video: any, i: number) => {
    return (
      <div className={style.video_container} key={i}>
        <ReactPlayer
          url={videoSource + video.snippet.resourceId.videoId}
          width={"100%"}
          height={"100%"}
        />
      </div>
    );
  });

  return (
    <section className={style.section}>
      <div className={style.video_grid}>
        {!loading ? videosArr : <LoadingSpinner />}
      </div>
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  youtube: state.youtube,
});

export default connect(mapStateToProps, { fetchVideos })(VideosComponent);
