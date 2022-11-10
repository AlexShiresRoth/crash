import React, { useEffect, useMemo } from "react";
import Layout from "../UI/layout/Layout";
import Store from "../components/store/Store";
import ReactGA from "react-ga";
import Head from "next/head";
import api from "../utils/api";
import { fetchStoreItems } from "../redux/actions/store";
import { connect, RootStateOrAny } from "react-redux";

ReactGA.initialize("UA-172813905-2", { debug: true });

ReactGA.pageview("/merch");

type Props = {
  store: any;
  shop: {
    catalog: Array<any>;
  };
};

const Shop = ({ store }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  return (
    <>
      <Head>
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
        <Store shopItems={store?.response} />
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const store:any = (await api.get("/shopifystore/inventory")) ?? [];

  return {
    props: {
      store: store?.data,
    },
  };
}

export default Shop;
