import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import Hub from "../components/main/Hub";
import { useRouter } from "next/dist/client/router";

const Main = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/Devils");
  });
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
