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

type Props = {
  shop?: any;
  showUpsell: Function;
};

const Upsell = ({
  shop: { upsellVisible, cart, catalog, checkout },
  showUpsell,
}: Props) => {
  const router = useRouter();

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
          console.log(array[j]);
          return array[j];
        }
      );

      //filter out items already in the cart
      const filtered = randomized
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

  useEffect(() => {
    if (upsellItems.length === 0 && upsellVisible) {
      router.push("/Checkout");
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
              console.log(item);
              return (
                <Fragment key={index}>
                  <UpsellItem style={style} item={item} index={index} />
                </Fragment>
              );
            })}
          </div>
          <div className={style.continue_box}>
            <Link href="/Checkout">
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

export default connect(mapStateToProps, { showUpsell })(Upsell);
