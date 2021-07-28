import React from "react";
import PropTypes from "prop-types";
import Layout from "../UI/layout/Layout";
import AboutComponent from "../components/about/AboutComponent";
import ReactGA from "react-ga";

ReactGA.initialize("UA-172813905-2");

ReactGA.pageview("/about");

const About = () => {
  return (
    <Layout>
      <AboutComponent />
    </Layout>
  );
};

About.propTypes = {};

export default About;
