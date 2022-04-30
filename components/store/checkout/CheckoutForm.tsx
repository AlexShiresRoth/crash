import React, { useEffect, useState } from "react";
import style from "./CheckoutForm.module.scss";
import { connect } from "react-redux";
import { processCheckout } from "../../../redux/actions/store";
import StoreAlert from "../alerts/StoreAlert";
import TotalDisplay from "./TotalDisplay";
import LoadingSpinner from "../../reusablecomps/LoadingSpinner";

interface Props {
  processCheckout: (id: string) => any;
  shop?: any;
  alerts?: any;
  email?: any;
}

const CheckoutForm = ({
  processCheckout,
  shop: { checkout, checkoutErrors, shippingInfo, processed },
  alerts,
}: Props) => {
  const [processing, setProcessing] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    processCheckout(checkout.id);

    return (window.location = checkout.webUrl);
  };

  useEffect(() => {
    if (processed) {
      setProcessing(false);
    }
  }, [processed]);
  return (
    <div className={style.checkout}>
      <div className={style.heading}>
        <TotalDisplay />
        {checkoutErrors && checkoutErrors.length > 0
          ? alerts.map((alert: any, i: number) => (
              <StoreAlert type={alert.alertType} status={alert.msg} key={i} />
            ))
          : null}
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className={style.btn_container}>
          {shippingInfo ? (
            processing ? (
              <>
                <LoadingSpinner
                  updateStyle={{ color: "#222", size: "1.5rem" }}
                />{" "}
                Processing...
              </>
            ) : (
              <button onSubmit={(e) => onSubmit(e)}>Checkout Now</button>
            )
          ) : (
            <button className={style.disabled} disabled={true}>
              Please enter your shipping info
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  shop: state.shop,
  alerts: state.alerts,
  email: state.email,
});

export default connect(mapStateToProps, { processCheckout })(CheckoutForm);
