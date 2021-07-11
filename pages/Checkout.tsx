import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import CheckoutModule from "../components/store/checkout/CheckoutModule";

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
