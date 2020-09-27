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
} from '../actions/types';

const initialState = {
	catalog: [],
	searchResults: [],
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
};

export default (state = initialState, action: any) => {
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
			localStorage.setItem('checkout', payload.id);
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
			};
		case FETCH_CHECKOUT: {
			return {
				...state,
				checkout: payload,
				shippingInfo: payload.shippingAddress !== null ? payload.shippingAddress : null,
				cart: payload.lineItems,
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
				searchResults: payload,
				loading: false,
				searching: true,
			};
		case ADD_TO_CART:
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
			};
		default:
			return state;
	}
};
