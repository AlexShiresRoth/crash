import React, { useEffect, useMemo } from "react";
import Layout from "../UI/layout/Layout";
import Hub from "../components/main/Hub";
import ReactGA from "react-ga";
import Head from "next/head";
import { connect, RootStateOrAny } from "react-redux";
import api from "../utils/api";
import { fetchStoreItems } from "../redux/actions/store";

ReactGA.initialize("UA-172813905-2");

ReactGA.pageview("/hub");

type Props = {
  store: any;
  fetchStoreItems: (storeItems: Array<any>) => any;
  shop: {
    catalog: Array<any>;
  };
};

const Main = ({ store, shop, fetchStoreItems }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  useMemo(() => {
    if (store?.response?.length > 0 || shop?.catalog.length === 0)
      fetchStoreItems(store?.response);
  }, [store?.response]);

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
        <Hub />
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const store = (await api.get("/shopifystore/inventory")) ?? [];

  return {
    props: {
      store: store?.data,
    },
  };
}

const mapStateToProps = (state: RootStateOrAny) => ({
  shop: state.shop,
});

export default connect(mapStateToProps, { fetchStoreItems })(Main);
