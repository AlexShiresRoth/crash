import api from "../../utils/api";
import {
  FETCH_STORE,
  STORE_ERROR,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SEARCH_STORE,
  CLEAR_SEARCH,
  SUBMIT_SHIPPING,
  SHIPPING_ERROR,
  START_ORDER,
  FETCH_CHECKOUT,
  SAVE_SHIPPING,
  PROCESS_CHECKOUT,
  FETCH_ITEM,
  CHECKOUT_ERROR,
  CLEAR_CHECKOUT,
  UPDATE_LINE_ITEM,
} from "./types";
import { setAlert } from "./alert";

const config = {
  accept: "application/json",
  headers: { "Content-Type": "application/json" },
};

export const fetchStoreItems = () => async (dispatch: any) => {
  try {
    const res = await api.get("/shopifystore/inventory");
    dispatch({
      type: FETCH_STORE,
      payload: res.data,
    });
  } catch (error: any) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      dispatch({
        type: STORE_ERROR,
        payload: errors,
      });
      errors.forEach((err: any) => dispatch(setAlert(err.msg, "danger")));
      return;
    }
    dispatch({
      type: STORE_ERROR,
      payload: error.response.data.msg,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

export const findStoreItem = (id: string) => async (dispatch: any) => {
  try {
    const res = await api.get(`/shopifystore/inventory/${id}`);
    dispatch({
      type: FETCH_ITEM,
      payload: res.data,
    });
  } catch (error: any) {
    dispatch({
      type: STORE_ERROR,
      payload: error,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

export const clearSearch = () => async (dispatch: any) => {
  try {
    dispatch({
      type: CLEAR_SEARCH,
    });
  } catch (error: any) {
    dispatch({
      type: STORE_ERROR,
      payload: error.response.data.msg,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

export const searchCatalog = (data: any) => async (dispatch: any) => {
  try {
    const res = await api.post("/shopifystore/search", data, config);
    console.log("searching:", data);
    dispatch({
      type: SEARCH_STORE,
      payload: { results: res.data, searchTerm: data.searchTerm },
    });
  } catch (error: any) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      dispatch({
        type: STORE_ERROR,
        payload: errors,
      });
      errors.forEach((err: any) => dispatch(setAlert(err.msg, "danger")));
      return;
    }
    dispatch({
      type: STORE_ERROR,
      payload: error.response.data.msg,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

export const addToCart = (item: any) => async (dispatch: any) => {
  const checkoutId = localStorage.getItem("checkout");
  try {
    const res = await api.post(`/shopifystore/addtocart/${checkoutId}`, item);
    console.log("added to cart", res.data);
    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });
    dispatch(setAlert("Added to cart", "success"));
  } catch (error: any) {
    dispatch({
      type: STORE_ERROR,
      payload: error.response.data.msg,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
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
      payload: res.data,
    });
  } catch (error: any) {
    dispatch({
      type: STORE_ERROR,
      payload: error.response.msg,
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
        payload: res.data,
      });
      dispatch(setAlert("Item removed from cart", "success"));
    } catch (error: any) {
      dispatch({
        type: STORE_ERROR,
        payload: error.response.data.msg,
      });
      dispatch(setAlert(error.response.data.msg, "danger"));
    }
  };

export const startOrder = () => async (dispatch: any) => {
  try {
    const res = await api.post("/shopifystore/startorder");

    dispatch({
      type: START_ORDER,
      payload: res.data,
    });
  } catch (error: any) {
    dispatch({
      type: STORE_ERROR,
      payload: error,
    });
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

export const fetchCheckout = (id: string) => async (dispatch: any) => {
  try {
    const res = await api.get(`/shopifystore/findcheckout/${id}`);
    // console.log('checkout:' + JSON.stringify(res.data));
    dispatch({
      type: FETCH_CHECKOUT,
      payload: res.data,
    });
  } catch (error: any) {
    dispatch({
      type: STORE_ERROR,
      payload: error,
    });
    dispatch(startOrder());
    dispatch(setAlert(error.response.data.msg, "danger"));
  }
};

export const submitShippingInfo = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post("/shopifystore/updateaddress", formData);
    console.log(res.data);
    dispatch({
      type: SUBMIT_SHIPPING,
      payload: res.data,
    });

    dispatch(setAlert("We have received your shipping info", "success"));
  } catch (error: any) {
    const errors = error.response.data.errors;
    if (errors) {
      dispatch({
        type: SHIPPING_ERROR,
        payload: errors,
      });
      errors.forEach((err: any) => dispatch(setAlert(err.msg, "danger")));

      return;
    }
    dispatch({
      type: SHIPPING_ERROR,
      payload: error.response.data.msg,
    });
    dispatch(setAlert(error.response.msg, "danger"));
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
      payload: res.data,
    });
  } catch (error: any) {
    const errors = error.response.data.errors;
    if (errors) {
      dispatch({
        type: CHECKOUT_ERROR,
        payload: errors,
      });
      errors.forEach((err: any) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: CHECKOUT_ERROR,
      payload: error.response.data.msg,
    });
    dispatch(setAlert(error.response.msg, "danger"));
  }
};

export const clearCheckout = () => async (dispatch: any) => {
  dispatch({
    type: CLEAR_CHECKOUT,
  });
};
