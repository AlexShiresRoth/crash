import React, { useEffect } from "react";
import Layout from "../UI/layout/Layout";
import SingleComponent from "../components/single/SingleComponent";
import ReactGA from "react-ga";
import Head from "next/head";

ReactGA.initialize("UA-172813905-2");

ReactGA.pageview("/single");

const Single = () => {
  useEffect(() => {
    window.addEventListener("load", () => {
      setTimeout(() => {
        window.scrollTo({ top: 0 });
      }, 100);
    });
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
        <SingleComponent />
      </Layout>
    </>
  );
};

export default Single;
