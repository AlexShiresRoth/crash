import React, { useEffect, useState } from "react";
import style from "./Layout.module.scss";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import { metaEvent } from "../../functions/metaEvent";
import { useRouter } from "next/dist/client/router";

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  const [hiddenElements, hideElement] = useState({
    footer: false,
    nav: false,
  });

  const { footer, nav } = hiddenElements;

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("devils")) {
        hideElement({ nav, footer: true });
      }
    }
  }, [footer, nav]);

  const router = useRouter();

  //pass page view event to meta server
  useEffect(() => {
    if (typeof window !== "undefined") {
      metaEvent({
        event_source_url: window.location.href,
        event_name: "PageView",
        content_name: router.pathname,
        value: 0,
        content_ids: null,
        emailHash: null,
        phoneHash: null,
      });
    }
  }, [router.pathname]);

  return (
    <main className={style.main}>
      <Nav />
      {children}
      {footer ? null : <Footer />}
    </main>
  );
};

export default Layout;
