import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import VideosComponent from "../components/videos/VideosComponent";

const videos = () => {
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

export default videos;
