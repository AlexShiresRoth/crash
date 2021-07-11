import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import Hub from "../components/main/Hub";

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
