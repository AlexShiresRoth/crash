import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import CheckoutModule from "../components/store/checkout/CheckoutModule";
import ReactGA from "react-ga";

ReactGA.initialize("UA-172813905-2");

ReactGA.pageview("/checkout");

const Checkout = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);
  return (
    <Layout>
      <CheckoutModule />
    </Layout>
  );
};

export default Checkout;
