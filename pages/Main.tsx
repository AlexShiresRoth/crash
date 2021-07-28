import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import Hub from "../components/main/Hub";
import ReactGA from "react-ga";

ReactGA.initialize("UA-172813905-2");

ReactGA.pageview("/hub");

const Main = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  return (
    <Layout>
      <Hub />
    </Layout>
  );
};

export default Main;
