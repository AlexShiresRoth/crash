import React, { useEffect } from "react";
import { Header } from "../components/landing/Header";
import ReactGA from "react-ga";
import Head from "next/head";
import { metaEvent } from "../functions/metaEvent";
import { useRouter } from "next/dist/client/router";
ReactGA.initialize("UA-172813905-2");

ReactGA.pageview("/landing");

const Landing = () => {
  const router = useRouter();

  console.log(router, window.location);
  useEffect(() => {
    if (typeof window !== "undefined") {
      metaEvent({
        event_source_url: window.location.href,
        event_name: "PageView",
        content_name: router.pathname,
        value: 0,
        content_ids: [],
        emailHash: "",
        phoneHash: "",
      });
    }
  }, [router]);

  return (
    <>
      <Head>
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
      <Header />
    </>
  );
};

export default Landing;
