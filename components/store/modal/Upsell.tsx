import React from "react";
import PropTypes from "prop-types";
import { connect, RootStateOrAny } from "react-redux";
import style from "./Upsell.module.scss";

type Props = {
  shop?: any;
};

const Upsell = ({ shop: { upsellVisible } }: Props) => {
  console.log("shop", upsellVisible);
  if (upsellVisible) {
    return (
      <div className={style.modal}>
        <h1>upsell</h1>
        <h2></h2>
      </div>
    );
  }

  return <div></div>;
};

Upsell.propTypes = {};

const mapStateToProps = (state: RootStateOrAny) => ({
  shop: state.shop,
});

export default connect(mapStateToProps, {})(Upsell);
