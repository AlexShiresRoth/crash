import React, { useEffect } from "react";
// import { Redirect } from 'react-router';
import Layout from "../UI/layout/Layout";
import VideosComponent from "../components/videos/VideosComponent";

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
