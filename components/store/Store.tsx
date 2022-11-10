import React, { useEffect, useState } from "react";
import style from "./Store.module.scss";
import { connect, RootStateOrAny } from "react-redux";
import {
  startOrder,
  fetchCheckout,
  clearCheckout,
  fetchStoreItems,
} from "../../redux/actions/store";
import SearchBar from "./search/SearchBar";
import StoreItems from "./StoreItems";
import Carousel from "./carousel/Carousel";
import ViewResults from "./ViewResults";
import StoreAlert from "./alerts/StoreAlert";

interface Props {
  startOrder: () => any;
  fetchCheckout: (val: any) => any;
  clearCheckout: () => void;
  fetchStoreItems: (val: any) => any;
  shop: {
    checkout: any;
    searchTerm: string;
    searchResults: Array<any>;
    catalog: Array<any>;
    musicVendor: string;
  };
  alerts: Array<any>;
  shopItems: Array<any>;
}

const Store = ({
  startOrder,
  fetchCheckout,
  shop: { checkout, searchTerm, catalog, searchResults, musicVendor },
  clearCheckout,
  fetchStoreItems,
  shopItems,
  alerts,
}: Props) => {

  const [resultAmt, filterResults] = useState<number>(0);

  const handleFetchStoreItems = async (items: any) =>
    await fetchStoreItems(items);

  useEffect(() => {
    if (checkout && checkout.order) {
      clearCheckout();
    }
  }, [checkout, clearCheckout]);

  useEffect(() => {
    //if a checkout has not been completed update current
    if (!localStorage.getItem("checkout")) {
      startOrder();
    } else {
      const id = localStorage.getItem("checkout");
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

  useEffect(() => {
    if (shopItems.length > 0) handleFetchStoreItems(shopItems);
  }, [shopItems, handleFetchStoreItems]);

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
  startOrder,
  fetchCheckout,
  clearCheckout,
  fetchStoreItems,
})(Store);
