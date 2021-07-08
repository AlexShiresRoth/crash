import React from "react";
import { connect } from "react-redux";
import { removeFromCart } from "../../../redux/actions/store";
import style from "./CartDisplay.module.scss";
import Link from "next/link";
import CartItem from "./CartItem";

interface Props {
  shop?: any;
  removeFromCart: (val: any, variantId: any) => any;
  setVisibility: (val: boolean) => any;
  isVisible: boolean;
}

const CartDisplay = ({
  shop: { cart, loading, checkout },
  removeFromCart,
  isVisible,
  setVisibility,
}: Props) => {
  return !loading ? (
    <div className={isVisible ? style.container : style.hidden}>
      <div className={style.inner}>
        <div className={style.close_cart}>
          <button onClick={() => setVisibility(!isVisible)}>Close X</button>
        </div>
        <div className={style.heading}>
          <h2>In your cart</h2>
        </div>
        <div className={style.items}>
          {cart.map((item: any, i: number) => {
            const itemToRemove = checkout.lineItems.filter(
              (lineItem: any) => lineItem.variant.id === item.variant.id
            )[0];

            return (
              <CartItem
                itemToRemove={itemToRemove}
                item={item}
                index={i}
                removeFromCart={removeFromCart}
                key={i}
              />
            );
          })}
        </div>
        <div className={style.checkout}>
          <Link href="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state: any) => {
  return {
    shop: state.shop,
  };
};

export default connect(mapStateToProps, { removeFromCart })(CartDisplay);
