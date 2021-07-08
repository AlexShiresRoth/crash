import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import style from "./CheckoutModule.module.scss";
import LoadingSpinner from "../../reusablecomps/LoadingSpinner";
import {
  removeFromCart,
  fetchCheckout,
  clearCheckout,
} from "../../../redux/actions/store";
import ShippingAddressForm from "./ShippingAddressForm";
import CheckoutForm from "./CheckoutForm";
import UpdateInfoToggle from "./UpdateInfoToggle";
import UpdateAddress from "./UpdateAddress";

interface Props {
  removeFromCart: (val: any, variantId: string) => any;
  shop?: any;
  fetchCheckout: (val: string) => any;
  clearCheckout: () => any;
}

const CheckoutModule = ({
  shop: { cart, loading, shippingInfo, shippingSaved, checkout },
  removeFromCart,
  fetchCheckout,
}: Props) => {
  useEffect(() => {
    if (checkout && checkout.order) {
      clearCheckout();
    }
  }, [checkout]);

  useEffect(() => {
    const id = localStorage.getItem("checkout") || "";
    fetchCheckout(id);
  }, [fetchCheckout, cart.length]);

  if (cart.length <= 0 || !cart) {
    return <Redirect to="/merch" />;
  }

  return (
    <section className={style.section}>
      {!loading && cart.length > 0 ? (
        <div className={style.inner}>
          <div className={style.container}>
            <div className={style.items_container}>
              <div className={style.heading}>
                <h2>Shopping Cart</h2>
                <p>Item count in cart: {cart.length}</p>
              </div>

              <div className={style.items}>
                {cart.map((cartItem: any, i: number) => {
                  const itemToRemove = checkout.lineItems.filter(
                    (lineItem: any) =>
                      lineItem.variant.id === cartItem.variant.id
                  )[0];
                  console.log(cartItem);
                  return (
                    <div className={style.item_container} key={i}>
                      <div className={style.col}>
                        <img
                          src={cartItem.variant.image.src}
                          alt={cartItem.title}
                        />
                      </div>
                      <div className={style.col}>
                        <h3>{cartItem.title}</h3>
                        <p>
                          Size/Type:
                          {cartItem.variant.title}
                        </p>
                        <p>Price: ${cartItem.variant.price}</p>
                        <p>Quantity:{cartItem.quantity}</p>
                      </div>
                      <div className={style.col}></div>
                      <div className={style.col}>
                        <button
                          onClick={() =>
                            removeFromCart(cartItem.id, itemToRemove)
                          }
                        >
                          Remove X
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {shippingInfo ? (
              //if update info toggled, show update form
              //otherwise show the address form
              !shippingSaved ? (
                <UpdateAddress />
              ) : (
                <UpdateInfoToggle />
              )
            ) : (
              <ShippingAddressForm />
            )}
          </div>
          <CheckoutForm />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  shop: state.shop,
});

export default connect(mapStateToProps, {
  removeFromCart,
  fetchCheckout,
  clearCheckout,
})(CheckoutModule);
