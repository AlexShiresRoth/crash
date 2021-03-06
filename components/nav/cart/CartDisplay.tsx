import React from "react";
import { connect } from "react-redux";
import { removeFromCart, showUpsell } from "../../../redux/actions/store";
import style from "./CartDisplay.module.scss";
import CartItem from "./CartItem";
import ReactGA from "react-ga";

interface Props {
  shop?: any;
  removeFromCart: (val: any, variantId: any) => any;
  setVisibility: any;
  isVisible: boolean;
  showUpsell: (val: boolean) => any;
}

const CartDisplay = ({
  shop: { cart, loading, checkout },
  removeFromCart,
  isVisible,
  setVisibility,
  showUpsell,
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
          <button
            onClick={(e) => {
              showUpsell(true);
              ReactGA.event({
                action: "Cart Display Checkout Button Click",
                category: "User",
                label: "Checkout Start",
              });
            }}
          >
            Proceed to Checkout
          </button>
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

export default connect(mapStateToProps, { removeFromCart, showUpsell })(
  CartDisplay
);
