import React from "react";
import { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import BookComponent from "../components/songbook/BookComponent";

const Songbook = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  }, []);
  return (
    <Layout>
      <BookComponent />
    </Layout>
  );
};

export default Songbook;