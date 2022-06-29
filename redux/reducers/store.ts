import {
  FETCH_STORE,
  ADD_TO_CART,
  STORE_ERROR,
  REMOVE_FROM_CART,
  SEARCH_STORE,
  FETCH_CATEGORIES,
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
  TOGGLE_UPSELL,
  RESET_STORE_ITEM,
} from "../actions/types";

const initialState = {
  catalog: [],
  searchResults: [],
  searchTerm: "All",
  foundItem: null,
  images: [],
  categories: [],
  loading: true,
  cart: [],
  checkout: null,
  errors: [],
  shippingErrors: [],
  searching: null,
  shippingInfo: null,
  shippingSaved: false,
  returnUrl: null,
  processed: false,
  lineItems: [],
  checkoutErrors: null,
  upsellVisible: false,
  loadingStoreItem: true,
  musicVendor: "single music",
};

export const store = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_STORE:
      return {
        ...state,
        catalog: payload,
        images: payload
          .filter((item: any) => item.images.length > 0)
          .map((item: any) => item.images.map((img: any) => img.src)),
        loading: false,
      };
    case START_ORDER:
      return {
        ...state,
        checkout: payload,
        loading: false,
      };
    case FETCH_ITEM:
      return {
        ...state,
        foundItem: payload,
        loading: false,
        loadingStoreItem: false,
      };

    case RESET_STORE_ITEM:
      return {
        ...state,
        foundItem: null,
        loadingStoreItem: true,
      };
    case FETCH_CHECKOUT: {
      window?.localStorage?.setItem("checkout", payload.id);
      return {
        ...state,
        checkout: payload,
        shippingInfo:
          payload.shippingAddress !== null ? payload.shippingAddress : null,
        cart: payload.lineItems ?? [],
        loading: false,
      };
    }
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case SEARCH_STORE:
      return {
        ...state,
        searchResults: payload.results,
        loading: false,
        searchTerm: payload.searchTerm,
        searching: true,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...payload.lineItems],
        checkout: payload,
        loading: false,
      };
    case UPDATE_LINE_ITEM:
      return {
        ...state,
        cart: [...payload.lineItems],
        checkout: payload,
        loading: false,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: [...payload.lineItems],
        checkout: payload,
        loading: false,
      };
    case SUBMIT_SHIPPING:
      //everyrtime checkout object is returned
      //the checkout state must also be updated
      return {
        ...state,
        shippingInfo: payload.shippingAddress,
        checkout: payload,
        shippingSaved: true,
        loading: false,
      };
    case TOGGLE_UPSELL: {
      return {
        ...state,
        upsellVisible: payload,
      };
    }
    case SAVE_SHIPPING:
      return {
        ...state,
        shippingSaved: payload,
        loading: false,
      };
    case SHIPPING_ERROR:
      return {
        ...state,
        shippingErrors: payload,
        shippingSaved: false,
        loading: false,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        searchResults: [],
        loading: false,
        searchTerm: "All",
      };
    case STORE_ERROR:
      return {
        ...state,
        errors: payload,
        processed: false,
        returnUrl: null,
        loading: false,
      };
    case PROCESS_CHECKOUT:
      return {
        ...state,
        returnUrl: payload.webUrl,
        checkout: payload,
        processed: true,
        loading: false,
        checkoutErrors: null,
      };
    case CHECKOUT_ERROR:
      return {
        ...state,
        checkoutErrors: payload,
        loading: false,
      };
    case CLEAR_CHECKOUT:
      localStorage.removeItem("checkout");
      return {
        ...state,
        loading: false,
        cart: [],
        checkout: null,
        shippingInfo: null,
        shippingSaved: false,
        lineItems: [],
        checkoutErrors: null,
        processed: false,
        returnUrl: null,
      };

    default:
      return state;
  }
};
