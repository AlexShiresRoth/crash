import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import SingleComponent from "../components/single/SingleComponent";

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
