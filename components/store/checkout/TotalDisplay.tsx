import React, { useEffect } from "react";
import style from "./TotalDisplay.module.scss";
import { connect } from "react-redux";

interface Props {
  shop?: any;
}

const TotalDisplay = ({ shop: { cart, checkout } }: Props) => {
  // const getTotal = () => {
  //   return cart.reduce((acc: any, item: any) => {
  //     return (acc += parseInt(item.variant.price));
  //   }, 0);
  // };

  // useEffect(() => {
  //   getTotal();
  // });

  return (
    <div className={style.total_display}>
      <div className={style.inner}>
        <p>
          <span>estimated subtotal:</span> {` `}${checkout.paymentDue}
        </p>
        <p>
          estimated shipping:
          <br /> <span>CALCULATED AT NEXT STEP</span>
        </p>
        <p>
          estimated tax:
          <br /> <strong>CALCULATED AT NEXT STEP</strong>
        </p>
        <p>estimated total: ${parseFloat(checkout.paymentDue).toFixed(2)}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  shop: state.shop,
});

export default connect(mapStateToProps, null)(TotalDisplay);
