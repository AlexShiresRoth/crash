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

const Cart = ({ shop, isVisible, setVisibility }: CartProps) => {
  const router = useRouter();
  const [newAdd, setNewAddition] = useState<boolean>(false);
  const [cartLength, setCartLength] = useState<number>(0);

  //do not show the cart if the user is not on the store page
  useEffect(() => {
    if (!router.asPath.includes("/store")) setVisibility(false);
  }, [router.asPath, setVisibility]);

  useEffect(() => {
    setCartLength((prevState: any) => {
      shop?.cart?.length > prevState
        ? setNewAddition(() => true)
        : setNewAddition(false);
      return shop?.cart?.length;
    });
  }, [shop?.cart]);

  useEffect(() => {
    setTimeout(() => {
      setNewAddition(() => false);
    }, 2000);
    return () => clearTimeout();
  }, [cartLength]);

  if (!shop?.cart) {
    return null;
  }

  return (
    <div className={style.cart}>
      <a onPointerDown={() => setVisibility(!isVisible)} href="#!">
        Cart
        {newAdd ? <FaCartPlus className={style.added} /> : <FaShoppingCart />}
        {shop?.cart?.length > 0 ? <span>{shop?.cart?.length}</span> : null}
      </a>
      {shop?.cart?.length > 0 ? (
        <CartDisplay isVisible={isVisible} setVisibility={setVisibility} />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: { shop: object }) => {
  return {
    shop: state.shop,
  };
};

export default connect(mapStateToProps, null)(Cart);
