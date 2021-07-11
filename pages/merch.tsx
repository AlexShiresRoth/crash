import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import Store from "../components/store/Store";

const merch = () => {
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

export default merch;
