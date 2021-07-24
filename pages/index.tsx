import { useRouter } from "next/dist/client/router";
import React from "react";
import { useEffect } from "react";
import { Header } from "../components/landing/Header";

const Landing = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/Devils");
  });

  return <Header />;
};

export default Landing;
