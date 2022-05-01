import React, { useEffect } from "react";
import Layout from "../../UI/layout/Layout";
import Item from "../../components/store/item-page/Item";
import {
  fetchCheckout,
  resetStoreItem,
  startOrder,
} from "../../redux/actions/store";
import { connect } from "react-redux";
import SuggestedItems from "../../components/store/item-page/SuggestedItems";
import ReactGA from "react-ga";
import Head from "next/head";

ReactGA.initialize("UA-172813905-2", { debug: true });

ReactGA.pageview("/merchitempage");

interface Props {
  fetchCheckout: (id: string) => any;
  startOrder: () => any;
  resetStoreItem: () => void;
}

const ItemPage = ({ fetchCheckout, startOrder, resetStoreItem }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  useEffect(() => {
    resetStoreItem();
  }, []);

  useEffect(() => {
    //if a checkout has not been completed update current
    if (!localStorage.getItem("checkout")) {
      console.log("new order");
      startOrder();
    } else {
      console.log("found order", localStorage.getItem("checkout"));
      const id = localStorage.getItem("checkout") || "";
      fetchCheckout(id);
    }
  }, [startOrder, fetchCheckout]);

  return (
    <>
      <Head>
        {" "}
        <script
          dangerouslySetInnerHTML={{
            __html: `!(function (f, b, e, v, n, t, s) {
				if (f.fbq) return;
				n = f.fbq = function () {
					n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
				};
				if (!f._fbq) f._fbq = n;
				n.push = n;
				n.loaded = !0;
				n.version = '2.0';
				n.queue = [];
				t = b.createElement(e);
				t.async = !0;
				t.src = v;
				s = b.getElementsByTagName(e)[0];
				s.parentNode.insertBefore(t, s);
			})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
			fbq('init', '682418259052811');
			fbq('track', 'PageView');`,
          }}
        ></script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KTX0ZNDXRT"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `	window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());

			gtag('config', 'G-KTX0ZNDXRT');`,
          }}
        ></script>
      </Head>
      <Layout>
        <Item />
        <SuggestedItems />
      </Layout>
    </>
  );
};

export default connect(null, { fetchCheckout, startOrder, resetStoreItem })(
  ItemPage
);
