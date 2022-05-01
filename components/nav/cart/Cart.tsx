import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { connect } from "react-redux";
import style from "./Cart.module.scss";
import CartDisplay from "./CartDisplay";
import { FaShoppingCart, FaCartPlus } from "react-icons/fa";
import { useRouter } from "next/dist/client/router";

interface Props {
  shop?: any;
  isVisible: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

type CartProps = Props;

const Cart = ({ shop: { cart }, isVisible, setVisibility }: CartProps) => {
  const router = useRouter();
  const [newAdd, setNewAddition] = useState<boolean>(false);
  const [cartLength, setCartLength] = useState<number>(0);

  //do not show the cart if the user is not on the store page
  useEffect(() => {
    if (!router.pathname.includes("store")) setVisibility(false);
  }, [router.pathname, setVisibility]);

  useEffect(() => {
    setCartLength((prevState: any) => {
      console.log(prevState, cart.length);
      cart.length > prevState
        ? setNewAddition(() => true)
        : setNewAddition(false);
      return cart.length;
    });
  }, [cart]);

  useEffect(() => {
    setTimeout(() => {
      setNewAddition(() => false);
    }, 2000);
    return () => clearTimeout();
  }, [cartLength]);

  return (
    <div className={style.cart}>
      <a onPointerDown={() => setVisibility(!isVisible)} href="#!">
        Cart
        {newAdd ? <FaCartPlus className={style.added} /> : <FaShoppingCart />}
        {cart.length > 0 ? <span>{cart.length}</span> : null}
      </a>
      {cart.length > 0 ? (
        <CartDisplay isVisible={isVisible} setVisibility={setVisibility} />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: { shop: object }) => {
  console.log("shop", state.shop);
  return {
    shop: state.shop,
  };
};

export default connect(mapStateToProps, null)(Cart);
