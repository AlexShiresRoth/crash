import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import VideosComponent from "../components/videos/VideosComponent";
import ReactGA from "react-ga";

ReactGA.initialize("UA-172813905-2");

ReactGA.pageview("/videos");

const Videos = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);
  return (
    <Layout>
      <VideosComponent />
    </Layout>
  );
};

export default Videos;
