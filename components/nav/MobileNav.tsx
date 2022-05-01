import React, { useState } from "react";
import style from "./MobileNav.module.scss";
import { navLinks } from "./navLinks";
import { logo } from "../svgs/logo";
import Cart from "./cart/Cart";
import {
  TiSocialFacebook,
  TiSocialYoutube,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";

import Link from "next/link";
import { connect, RootStateOrAny } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/dist/client/router";

type Props = {
  shop: { cart: any };
  isVisible: boolean;
  setVisibility: any;
};

const MobileNav = ({ shop: { cart }, isVisible, setVisibility }: Props) => {
  const router = useRouter();
  //show the nav
  const [menuOpen, toggleMenu] = useState<boolean>(false);
  //show the cart
  const menu = navLinks.map((item) => {
    return (
      <Link href={item.path} key={item.id}>
        {item.name}
      </Link>
    );
  });
  console.log("router", router);
  const goToCheckout = () => router.push("/Checkout");
  return (
    <>
      {cart.length > 0 && router.route.toLowerCase().includes("/merch") && (
        <div className={style.cart_icon}>
          <button onClick={(_) => goToCheckout()}>
            <FaShoppingCart />
            <span>{cart.length > 0 && cart.length}</span>
          </button>
        </div>
      )}
      <nav className={style.mobile_nav}>
        <div className={style.left}>
          <Link href="/main">
            <a>{logo}</a>
          </Link>
        </div>
        <div className={style.right}>
          <div className={style.menu} onClick={(e) => toggleMenu(!menuOpen)}>
            <span className={menuOpen ? style.rotated : ""}></span>
            <span className={menuOpen ? style.rotated : ""}></span>
            <span className={menuOpen ? style.rotated : ""}></span>
          </div>
        </div>
        <div className={menuOpen ? style.open : style.hidden}>
          <div className={style.top_bar}>
            <div className={style.left}>
              <Link href="/main">
                <a>{logo}</a>
              </Link>
            </div>
            <div className={style.right}>
              <div
                className={style.menu}
                onClick={(e) => toggleMenu(!menuOpen)}
              >
                <span className={menuOpen ? style.rotated : ""}></span>
                <span className={menuOpen ? style.rotated : ""}></span>
                <span className={menuOpen ? style.rotated : ""}></span>
              </div>
            </div>
          </div>
          <div className={style.centered}>
            <div className={style.social}>
              <a
                href="http://facebook.com/crashthecalmny"
                rel="noopener noreferrer"
                target="_blank"
              >
                <TiSocialFacebook />
              </a>
              <a
                href="http://youtube.com/channel/UCAEhEbQ5bgCoyCDWczfmuyA"
                rel="noopener noreferrer"
                target="_blank"
              >
                <TiSocialYoutube />
              </a>
              <a
                href="http://twitter.com/crashthecalmny"
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
            {menu}
            <a
              href="https://www.ultimate-guitar.com/artist/crash_the_calm_1012847"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tabs
            </a>
            <Cart isVisible={isVisible} setVisibility={setVisibility} />
          </div>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  shop: state.shop,
});

export default connect(mapStateToProps, {})(MobileNav);
