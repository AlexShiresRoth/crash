import React from "react";
import { Header } from "../components/landing/Header";
import ReactGA from "react-ga";

ReactGA.initialize("UA-172813905-2");

ReactGA.pageview("/landing");

const Landing = () => {
  return <Header />;
};

export default Landing;
