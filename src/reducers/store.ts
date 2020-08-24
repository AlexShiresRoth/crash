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
} from '../actions/types';

const initialState = {
	catalog: [],
	searchResults: [],
	images: [],
	categories: [],
	loading: true,
	cart: [],
	checkout: null,
	errors: [],
	shippingErrors: [],
	searching: null,
	shippingInfo: null,
	returnUrl: null,
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
		case FETCH_CHECKOUT: {
			return {
				...state,
				checkout: payload,
				shippingInfo: payload.shippingAddress !== null ? payload.shippingAddress : null,
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
				cart: [...state.cart, payload],
				loading: false,
			};
		case REMOVE_FROM_CART:
			return {
				...state,
				cart: state.cart.filter((cartItem: any) => cartItem.id !== payload),
				loading: false,
			};
		case SUBMIT_SHIPPING:
			return {
				...state,
				shippingInfo: payload,
				loading: false,
			};
		case SHIPPING_ERROR:
			return {
				...state,
				shippingErrors: payload,
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
				loading: false,
			};
		default:
			return state;
	}
};
