import React from "react";
import style from "./UpdateToggle.module.scss";
import { connect } from "react-redux";
import { toggleShippingModule } from "../../../redux/actions/store";
import StoreAlert from "../alerts/StoreAlert";

interface Props {
  shop?: any;
  toggleShippingModule: (val: boolean) => any;
  alerts: Array<any>;
}

const UpdateInfoToggle = ({
  shop: { shippingSaved },
  toggleShippingModule,
  alerts,
}: Props) => {
  return (
    <div className={style.saved_info}>
      {alerts.length > 0
        ? alerts.map((alert: any, i: number) => (
            <StoreAlert type={alert.alertType} status={alert.msg} key={i} />
          ))
        : null}
      <h1>Shipping info was saved!</h1>
      <button onClick={(e) => toggleShippingModule(!shippingSaved)}>
        Update Info
      </button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  shop: state.shop,
  alerts: state.alerts,
});

export default connect(mapStateToProps, { toggleShippingModule })(
  UpdateInfoToggle
);
