import React from "react";
import Layout from "../UI/layout/Layout";
import Music from "../components/store/music/Music";

import ReactGA from "react-ga";

ReactGA.initialize("UA-172813905-2");

ReactGA.pageview("/music");

const MusicPage = () => {
  return (
    <Layout>
      <Music />
    </Layout>
  );
};

export default MusicPage;
