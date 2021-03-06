import React, { useEffect } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { startOrder, fetchCheckout } from "../../../redux/actions/store";
import LoadingSpinner from "../../reusablecomps/LoadingSpinner";
import style from "./Music.module.scss";
import MusicItems from "./MusicItems";

interface Props {
  startOrder: () => any;
  fetchCheckout: (val: any) => any;
  shop: {
    loading: boolean;
  };
}

const Music = ({ fetchCheckout, startOrder, shop: { loading } }: Props) => {
  useEffect(() => {
    //if a checkout has not been completed update current
    if (!localStorage.getItem("checkout")) {
      startOrder();
    } else {
      const id = localStorage.getItem("checkout") || "";
      fetchCheckout(id);
    }
  }, [startOrder, fetchCheckout]);
  return (
    <section className={style.section}>
      <h2>Shop All Music</h2>
      {!loading ? (
        <div className={style.store_grid}>
          <MusicItems />
        </div>
      ) : (
        <LoadingSpinner updateStyle={{ color: "#fff", size: "3rem" }} />
      )}
    </section>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  shop: state.shop,
});

export default connect(mapStateToProps, {
  fetchCheckout,
  startOrder,
})(Music);
