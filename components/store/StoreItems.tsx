import React from "react";
import StoreItem from "./StoreItem";
import { connect } from "react-redux";
import LoadingSpinner from "../reusablecomps/LoadingSpinner";

interface Props {
  shop?: any;
}

const StoreItems = ({
  shop: { catalog, loading, searchResults, musicVendor },
}: Props) => {
  //sort catalog by update  date
  const handleCatalog = catalog
    .map((catItem: any) => catItem)
    .sort((a: any, b: any) => {
      const aDate = new Date(a.updatedAt);
      const bDate = new Date(b.updatedAt);
      return aDate.getTime() < bDate.getTime() ? 1 : -1;
    })
    .filter((item: any) => {
      return item.vendor && item.vendor.toLowerCase() !== musicVendor;
    })
    .map((item: any, i: number) => <StoreItem item={item} index={i} key={i} />);

  const handleSearch = searchResults.map((item: any, i: number) => (
    <StoreItem item={item} index={i} key={i} />
  ));

  return (
    <>
      {!loading && catalog.length > 0 ? (
        searchResults.length > 0 ? (
          handleSearch
        ) : (
          handleCatalog
        )
      ) : (
        <LoadingSpinner updateStyle={{ color: "#222", size: "1.5rem" }} />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    shop: state.shop,
  };
};

export default connect(mapStateToProps, null)(StoreItems);
