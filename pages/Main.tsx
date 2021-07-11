import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import Hub from "../components/main/Hub";

const main = () => {
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

export default main;
