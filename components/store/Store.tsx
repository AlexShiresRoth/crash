import React, { useEffect, useState } from "react";
import style from "./Store.module.scss";
import { connect, RootStateOrAny } from "react-redux";
import {
  fetchStoreItems,
  startOrder,
  fetchCheckout,
  clearCheckout,
} from "../../redux/actions/store";
import SearchBar from "./search/SearchBar";
import StoreItems from "./StoreItems";
import Carousel from "./carousel/Carousel";
import ViewResults from "./ViewResults";
import StoreAlert from "./alerts/StoreAlert";

interface Props {
  fetchStoreItems: () => any;
  startOrder: () => any;
  fetchCheckout: (val: any) => any;
  clearCheckout: () => void;
  shop: {
    checkout: any;
    searchTerm: string;
    searchResults: Array<any>;
    catalog: Array<any>;
    musicVendor: string;
  };
  alerts: Array<any>;
}

const Store = ({
  fetchStoreItems,
  startOrder,
  fetchCheckout,
  shop: { checkout, searchTerm, catalog, searchResults, musicVendor },
  clearCheckout,
  alerts,
}: Props) => {
  const [resultAmt, filterResults] = useState<number>(0);

  useEffect(() => {
    if (checkout && checkout.order) {
      clearCheckout();
    }
  }, [checkout, clearCheckout]);

  useEffect(() => {
    fetchStoreItems();
  }, [fetchStoreItems]);

  useEffect(() => {
    //if a checkout has not been completed update current
    if (!localStorage.getItem("checkout")) {
      startOrder();
    } else {
      const id = localStorage.getItem("checkout") || "";
      fetchCheckout(id);
    }
  }, [startOrder, fetchCheckout]);

  //get result amount
  useEffect(() => {
    if (searchTerm !== "All") {
      filterResults(searchResults.length);
    } else {
      filterResults(
        catalog.filter((item) => item?.vendor.toLowerCase() !== musicVendor)
          .length
      );
    }
  }, [catalog, searchTerm, searchResults, musicVendor]);

  return (
    <section className={style.section}>
      <Carousel />
      <SearchBar />
      <ViewResults searchTerm={searchTerm} resultAmt={resultAmt} />
      <div className={style.store_grid}>
        <StoreItems />
      </div>
      {alerts.length > 0 ? (
        <StoreAlert status={alerts[0].msg} type={alerts[0].alertType} />
      ) : null}
    </section>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  shop: state.shop,
  alerts: state.alerts,
});

export default connect(mapStateToProps, {
  fetchStoreItems,
  startOrder,
  fetchCheckout,
  clearCheckout,
})(Store);
