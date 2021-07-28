import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import SingleComponent from "../components/single/SingleComponent";
import ReactGA from "react-ga";

ReactGA.initialize("UA-172813905-2");

ReactGA.pageview("/single");

const Single = () => {
  useEffect(() => {
    window.addEventListener("load", () => {
      setTimeout(() => {
        window.scrollTo({ top: 0 });
      }, 100);
    });
  }, []);
  return (
    <Layout>
      <SingleComponent />
    </Layout>
  );
};

export default Single;
