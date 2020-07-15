import {
	FETCH_STORE,
	ADD_TO_CART,
	STORE_ERROR,
	REMOVE_FROM_CART,
	SEARCH_STORE,
	FETCH_IMAGES,
	FETCH_CATEGORIES,
} from '../actions/types';

const initialState = {
	catalog: [],
	images: [],
	categories: [],
	loading: true,
	cart: [],
	errors: [],
};

export default (state = initialState, action: any) => {
	const { type, payload } = action;

	switch (type) {
		case FETCH_STORE:
			return {
				...state,
				catalog: payload,
				loading: false,
			};
		case FETCH_IMAGES:
			return {
				...state,
				images: payload,
				loading: false,
			};
		case FETCH_CATEGORIES:
			return {
				...state,
				categories: payload,
				loading: false,
			};
		case SEARCH_STORE:
			return {
				...state,
				catalog: payload,
				loading: false,
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
