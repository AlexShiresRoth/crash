import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { connect, RootStateOrAny } from "react-redux";
import { showUpsell } from "../../../redux/actions/store";
import style from "./Upsell.module.scss";
import UpsellItem from "./UpsellItem";
import ReactGA from "react-ga";

type Props = {
  shop?: any;
  showUpsell: Function;
};

const Upsell = ({
  shop: { upsellVisible, cart, catalog, checkout },
  showUpsell,
}: Props) => {
  const [upsellItems, setItems] = useState<Array<any>>([]);

  useEffect(() => {
    if (catalog.length > 0) {
      const onlyUpsellItems = catalog.filter((item: any) => {
        // const itemOptions = item.options.filter(
        //   (opt: any) => opt?.name.toLowerCase() === "isupsell"
        // );
        return (
          item.handle === "devils-4-piece-aluminum-alloy-grinder" ||
          item.handle === "classic-logo-tee" ||
          item.handle === "a-town-named-nowhere-volume-i"
        );
      });

      const randomized = onlyUpsellItems.map(
        (item: any, index: number, array: Array<any>) => {
          const j = Math.floor(Math.random() * index);
          const temp = array[index];
          array[index] = array[j];
          array[j] = temp;
          return array[j];
        }
      );

      //filter out items already in the cart
      const filtered = randomized
        .filter((item: any) => {
          const dupes: Array<any> = [];

          const matches: Array<any> = [];

          if (!cart) return false;

          const ids = cart
            .map((cartItem: { variant: { id: string } }) => cartItem.variant.id)
            .concat(item.variants.map((variant: { id: string }) => variant.id));

          ids.forEach((itemId: string) =>
            dupes.includes(itemId) ? matches.push(itemId) : dupes.push(itemId)
          );

          return matches.length === 0;
        })
        .slice(0, 3);

      setItems(filtered);
    }
  }, [catalog, cart]);

  useEffect(() => {
    if (upsellItems.length === 0 && upsellVisible) {
      return (window.location = checkout.webUrl);
    }
  }, [upsellItems, upsellVisible]);

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
              return (
                <Fragment key={index}>
                  <UpsellItem style={style} item={item} index={index} />
                </Fragment>
              );
            })}
          </div>
          <div className={style.continue_box}>
            <a
              className={style.continue}
              href={`${checkout.webUrl}`}
              onClick={() => {
                ReactGA.event({
                  action: "continueToCheckout",
                  category: "User",
                  label: "Clicked on upsell continue button",
                });
              }}
            >
              Continue <FaArrowRight size={".9rem"} />
            </a>
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

export default connect(mapStateToProps, { showUpsell })(Upsell);
