import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import Store from "../components/store/Store";
import ReactGA from "react-ga";

ReactGA.initialize("UA-172813905-2", { debug: true });

ReactGA.pageview("/merch");

const Merch = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);
  return (
    <Layout>
      <Store />
    </Layout>
  );
};

export default Merch;
