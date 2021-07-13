import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { connect, RootStateOrAny } from "react-redux";
import { addToCart, showUpsell } from "../../../redux/actions/store";
import style from "./Upsell.module.scss";

type Props = {
  shop?: any;
  addToCart: Function;
  showUpsell: Function;
};

const Upsell = ({
  shop: { upsellVisible, cart, catalog },
  showUpsell,
  addToCart,
}: Props) => {
  const [upsellItems, setItems] = useState<Array<any>>([]);

  const checkIfInCart = (item: any) => {};

  useEffect(() => {
    if (catalog.length > 0) {
      //filter out items already in the cart
      const filtered = catalog
        .filter((item: any) => {
          const dupes: Array<any> = [];

          const matches: Array<any> = [];

          const ids = cart
            .map((cartItem: { variant: { id: string } }) => cartItem.variant.id)
            .concat(item.variants.map((variant: { id: string }) => variant.id));

          ids.forEach((itemId: string) =>
            dupes.includes(itemId) ? matches.push(itemId) : dupes.push(itemId)
          );

          console.log("matches", matches);

          return matches.length === 0;
        })
        .slice(0, 3);

      setItems(filtered);
    }
  }, [catalog, cart]);

  if (upsellVisible) {
    return (
      <div className={style.modal}>
        <div className={style.upsell}>
          <div className={style.heading}>
            <h2>Thanks for your support!</h2>
            <button onClick={(e) => showUpsell(false)}>X</button>
          </div>
          <div className={style.items}>
            {upsellItems.map((item: any, index: number) => {
              console.log(item);
              return (
                <div className={style.item} key={index}>
                  <div className={style.row}>
                    <div className={style.img_container}>
                      <Image
                        src={item.images[0].src}
                        height="100%"
                        width="100%"
                        alt={item.title}
                      />
                    </div>
                    <p>{item.title}</p>
                    <button onClick={(e) => addToCart(item)}>
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={style.continue_box}>
            <Link href="/checkout">
              <a className={style.continue}>
                Continue <FaArrowRight size={".9rem"} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
};

const mapStateToProps = (state: RootStateOrAny) => ({
  shop: state.shop,
});

export default connect(mapStateToProps, { showUpsell, addToCart })(Upsell);
