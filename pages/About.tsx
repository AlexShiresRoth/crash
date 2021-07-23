import React from "react";
import PropTypes from "prop-types";
import Layout from "../UI/layout/Layout";
import AboutComponent from "../components/about/AboutComponent";

const About = () => {
  return (
    <Layout>
      <AboutComponent />
    </Layout>
  );
};

About.propTypes = {};

export default About;
