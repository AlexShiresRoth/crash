import api from "../../utils/api";
import {
  FETCH_STORE,
  STORE_ERROR,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SEARCH_STORE,
  CLEAR_SEARCH,
  SUBMIT_SHIPPING,
  START_ORDER,
  FETCH_CHECKOUT,
  SAVE_SHIPPING,
  PROCESS_CHECKOUT,
  FETCH_ITEM,
  CLEAR_CHECKOUT,
  UPDATE_LINE_ITEM,
  TOGGLE_UPSELL,
  RESET_STORE_ITEM,
  SHIPPING_ERROR,
  CHECKOUT_ERROR,
} from "./types";
import { setAlert } from "./alert";

const config = {
  accept: "application/json",
  headers: { "Content-Type": "application/json" },
};

export const fetchStoreItems = () => async (dispatch: any) => {
  try {
    const res = await api.get("/shopifystore/inventory");
    console.log("res", res.data);
    dispatch({
      type: FETCH_STORE,
      payload: res.data.response,
    });
  } catch (error) {
    console.error(error);

    dispatch({
      type: STORE_ERROR,
      payload: error,
    });

    dispatch(setAlert("Could not load store items", "danger"));
  }
};

export const findStoreItem = (id: string) => async (dispatch: any) => {
  try {
    const res = await api.get(`/shopifystore/inventory/${id}`);
    dispatch({
      type: FETCH_ITEM,
      payload: res.data.response,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: STORE_ERROR,
      payload: error,
    });
    dispatch(setAlert("Could not locate item", "danger"));
  }
};

export const clearSearch = () => async (dispatch: any) => {
  try {
    dispatch({
      type: CLEAR_SEARCH,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: STORE_ERROR,
      payload: error,
    });
    dispatch(setAlert("Search could not clear", "danger"));
  }
};

export const searchCatalog = (data: any) => async (dispatch: any) => {
  try {
    const res = await api.post("/shopifystore/search", data, config);
    console.log("searching:", data);
    dispatch({
      type: SEARCH_STORE,
      payload: { results: res.data.response, searchTerm: data.searchTerm },
    });
  } catch (error) {
    console.error(error);

    dispatch({
      type: STORE_ERROR,
      payload: error,
    });
    dispatch(setAlert("Could not search", "danger"));
  }
};

export const addToCart = (item: any) => async (dispatch: any) => {
  const checkoutId = localStorage.getItem("checkout");
  console.log("item added to cart", item);
  try {
    const res = await api.post(`/shopifystore/addtocart/${checkoutId}`, item);
    console.log("added to cart", res.data);
    dispatch({
      type: ADD_TO_CART,
      payload: res.data.response,
    });
    dispatch(setAlert("Added to cart", "success"));
  } catch (error) {
    console.error(error);
    dispatch({
      type: STORE_ERROR,
      payload: error,
    });
    dispatch(setAlert("Could not add to cart", "danger"));
  }
};

export const updateLineItem = (item: any) => async (dispatch: any) => {
  const checkoutId = localStorage.getItem("checkout");
  try {
    const res = await api.put(
      `/shopifystore/updatelineitem/${checkoutId}`,
      item
    );

    dispatch({
      type: UPDATE_LINE_ITEM,
      payload: res.data.response,
    });
  } catch (error) {
    dispatch({
      type: STORE_ERROR,
      payload: error,
    });
  }
};

export const removeFromCart =
  (id: string, variant: any) => async (dispatch: any) => {
    //must always receive an id as first param
    //second param must be variant object
    const checkoutId = localStorage.getItem("checkout");
    try {
      const res = await api.post(
        `/shopifystore/removefromcart/${checkoutId}`,
        variant
      );

      dispatch({
        type: REMOVE_FROM_CART,
        payload: res.data.response,
      });
      dispatch(setAlert("Item removed from cart", "success"));
    } catch (error) {
      console.error(error);
      dispatch({
        type: STORE_ERROR,
        payload: error,
      });
      dispatch(setAlert("Could not remove from cart", "danger"));
    }
  };

export const startOrder = () => async (dispatch: any) => {
  try {
    const res = await api.post("/shopifystore/startorder");

    dispatch({
      type: START_ORDER,
      payload: res.data.response,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: STORE_ERROR,
      payload: error,
    });
    dispatch(setAlert("Could not start order", "danger"));
  }
};

export const fetchCheckout = (id: string) => async (dispatch: any) => {
  try {
    const res = await api.get(`/shopifystore/findcheckout/${id}`);
    // console.log('checkout:' + JSON.stringify(res.data));
    dispatch({
      type: FETCH_CHECKOUT,
      payload: res.data.response,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: STORE_ERROR,
      payload: error,
    });
    //if no checkout exists start a new process
    dispatch(startOrder());
  }
};

export const submitShippingInfo = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post("/shopifystore/updateaddress", formData);
    console.log(res.data);
    dispatch({
      type: SUBMIT_SHIPPING,
      payload: res.data.response,
    });

    dispatch(setAlert("We have received your shipping info", "success"));
  } catch (error) {
    console.error(error);

    dispatch({
      type: SHIPPING_ERROR,
      payload: error,
    });
    dispatch(setAlert("Please fix shipping info", "danger"));
  }
};

export const toggleShippingModule =
  (data: boolean) => async (dispatch: any) => {
    dispatch({
      type: SAVE_SHIPPING,
      payload: data,
    });
  };

export const processCheckout = (id: string) => async (dispatch: any) => {
  try {
    const res = await api.post(`/shopifystore/processcheckout/${id}`);
    dispatch({
      type: PROCESS_CHECKOUT,
      payload: res.data.response,
    });
  } catch (error) {
    console.error(error);

    dispatch({
      type: CHECKOUT_ERROR,
      payload: error,
    });
    dispatch(setAlert("Could not process checkout", "danger"));
  }
};

export const clearCheckout = () => async (dispatch: any) => {
  dispatch({
    type: CLEAR_CHECKOUT,
  });
};

export const showUpsell = (val: boolean) => async (dispatch: any) => {
  dispatch({
    type: TOGGLE_UPSELL,
    payload: val,
  });
};

export const resetStoreItem = () => async (dispatch: any) => {
  dispatch({
    type: RESET_STORE_ITEM,
  });
};
