import React, { useEffect } from "react";
import Layout from "../../UI/layout/Layout";
import Item from "../../components/store/item-page/Item";
import { fetchCheckout, startOrder } from "../../redux/actions/store";
import { connect } from "react-redux";
import SuggestedItems from "../../components/store/item-page/SuggestedItems";
import MusicItem from "../../components/store/music/MusicItem";

interface Props {
  fetchCheckout: (id: string) => any;
  startOrder: () => any;
}

const MusicItemPage = ({ fetchCheckout, startOrder }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);
  useEffect(() => {
    //if a checkout has not been completed update current
    if (!localStorage.getItem("checkout")) {
      console.log("new order");
      startOrder();
    } else {
      console.log("found order", localStorage.getItem("checkout"));
      const id = localStorage.getItem("checkout") || "";
      fetchCheckout(id);
    }
  }, [startOrder, fetchCheckout]);
  return (
    <Layout>
      <Item />
      <SuggestedItems />
    </Layout>
  );
};

export default connect(null, { fetchCheckout, startOrder })(MusicItemPage);