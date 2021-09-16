import React, { useEffect, useState } from "react";
import style from "./Nav.module.scss";
import { navLinks } from "./navLinks";
import { logo } from "../svgs/logo";
import Cart from "./cart/Cart";
import { connect } from "react-redux";
import { clearSearch } from "../../redux/actions/store";
import MobileNav from "./MobileNav";
import Link from "next/link";
import {
  TiSocialFacebook,
  TiSocialYoutube,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";
import { SiTiktok } from "react-icons/si";
import { useRouter } from "next/dist/client/router";
import Upsell from "../store/modal/Upsell";

interface NavProps {
  clearSearch: () => any;
}

type Props = NavProps;

const Nav = ({ clearSearch }: Props) => {
  const router = useRouter();
  console.log("routes", router);
  const [isScrolling, setScrolling] = useState(false);
  const [links, filterLinks] = useState<Array<any>>(navLinks);
  //cart display
  const [isVisible, setVisibility] = useState<boolean>(false);
  useEffect(() => {
    //if location is not the store then don't have the cart popup
    if (!router.pathname.includes("store")) {
      clearSearch();
    }
    if (router.pathname.includes("devils")) {
      const newLinks = navLinks.filter(
        (item: { name: string; path: string }) => {
          return item.name === "merch" || item.name === "music";
        }
      );

      filterLinks(newLinks);
    }
  }, [clearSearch, router.pathname]);

  useEffect(() => {
    window.addEventListener("scroll", () =>
      setScrolling(() => window.pageYOffset > 0)
    );
  }, []);

  return (
    <>
      <nav
        className={
          !isScrolling ? style.nav : `${style.nav} ${style.nav_scrolling}`
        }
      >
        <div className={style.left}>
          <Link href="/Main" as="/home">
            <a>{logo}</a>
          </Link>
          <div className={style.social}>
            <a
              href="http://facebook.com/crashthecalmny"
              rel="noopener noreferrer"
              target="_blank"
            >
              <TiSocialFacebook />
            </a>
            <a
              href="https://vm.tiktok.com/ZMdqwFjLk"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SiTiktok />
            </a>
            <a
              href="http://youtube.com/channel/UCAEhEbQ5bgCoyCDWczfmuyA"
              rel="noopener noreferrer"
              target="_blank"
            >
              <TiSocialYoutube />
            </a>
            <a
              href="http://twitter.com/crashthecalm"
              rel="noopener noreferrer"
              target="_blank"
            >
              <TiSocialTwitter />
            </a>
            <a
              href="http://instagram.com/crashthecalmny"
              rel="noopener noreferrer"
              target="_blank"
            >
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div className={style.right}>
          {links.map((item) => {
            return (
              <Link href={item.path} key={item.id}>
                <a>{item.name}</a>
              </Link>
            );
          })}
          <a
            href="https://www.ultimate-guitar.com/artist/crash_the_calm_1012847"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tabs
          </a>
          <Cart isVisible={isVisible} setVisibility={setVisibility} />
        </div>
      </nav>
      <MobileNav isVisible={isVisible} setVisibility={setVisibility} />
      <Upsell />
    </>
  );
};

export default connect(null, { clearSearch })(Nav);
