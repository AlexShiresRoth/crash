import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import style from "./Upsell.module.scss";

type Props = {
  shop?: any;
};

const Upsell = ({ shop: { upsellVisible, cart, catalog } }: Props) => {
  const router = useRouter();

  const [upsellItems, setItems] = useState<Array<any>>([]);

  const goToCheckout = () => router.push("/checkout");

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
            <h2>Thanks for the support!</h2>
            <button onClick={(e) => goToCheckout()}>X</button>
          </div>
          <div className={style.items}>
            {upsellItems.map((item: any, index: number) => {
              return (
                <div className={style.item} key={index}>
                  <div className={item.row}>
                    <div className={style.img_container}>
                      <Image
                        src={item.images[0].src}
                        height="100%"
                        width="100%"
                        alt={item.title}
                      />
                    </div>
                    <p>{item.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/checkout">
            <a>Continue</a>
          </Link>
        </div>
      </div>
    );
  }

  return <div></div>;
};

const mapStateToProps = (state: RootStateOrAny) => ({
  shop: state.shop,
});

export default connect(mapStateToProps, {})(Upsell);
