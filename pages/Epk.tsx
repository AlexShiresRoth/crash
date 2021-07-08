import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import EpkComponent from "../components/epk/EpkComponent";

const Epk = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);
  return (
    <Layout>
      <EpkComponent />
    </Layout>
  );
};

export default Epk;
