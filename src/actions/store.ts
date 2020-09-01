import api from '../utils/api';
import {
	FETCH_STORE,
	STORE_ERROR,
	ADD_TO_CART,
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
} from './types';
import { setAlert } from './alert';
import { Redirect } from 'react-router';

const config = {
	accept: 'application/json',
	headers: { 'Content-Type': 'application/json' },
};

export const fetchStoreItems = () => async (dispatch: any) => {
	try {
		const res = await api.get('/shopifystore/inventory');
		dispatch({
			type: FETCH_STORE,
			payload: res.data,
		});
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(errors);
		if (errors) {
			dispatch({
				type: STORE_ERROR,
				payload: errors,
			});
			errors.forEach((err: any) => dispatch(setAlert(err.msg, 'danger')));
			return;
		}
		dispatch({
			type: STORE_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const clearSearch = () => async (dispatch: any) => {
	try {
		dispatch({
			type: CLEAR_SEARCH,
		});
	} catch (error) {
		dispatch({
			type: STORE_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const fetchCategories = () => async (dispatch: any) => {
	try {
		const res = await api.get('/store/categories');

		dispatch({
			type: FETCH_CATEGORIES,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: STORE_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const searchCatalog = (data: any) => async (dispatch: any) => {
	try {
		const res = await api.post('/store', data, config);

		dispatch({
			type: SEARCH_STORE,
			payload: res.data,
		});
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(errors);
		if (errors) {
			dispatch({
				type: STORE_ERROR,
				payload: errors,
			});
			errors.forEach((err: any) => dispatch(setAlert(err.msg, 'danger')));
			return;
		}
		dispatch({
			type: STORE_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const addToCart = (item: string) => async (dispatch: any) => {
	const checkoutId = localStorage.getItem('checkout');

	console.log(item, checkoutId);
	try {
		const res = await api.post(`/shopifystore/addtocart/${checkoutId}`, item);
		console.log('added to cart', res.data);
		dispatch({
			type: ADD_TO_CART,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: STORE_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const removeFromCart = (id: string, variant: any) => async (dispatch: any) => {
	//must always receive an id as first param
	//second param must be variant object
	const checkoutId = localStorage.getItem('checkout');

	console.log(variant);
	try {
		const res = await api.post(`/shopifystore/removefromcart/${checkoutId}`, variant);

		dispatch({
			type: REMOVE_FROM_CART,
			payload: res.data,
		});
		dispatch(setAlert('Item removed from cart', 'success'));
	} catch (error) {
		dispatch({
			type: STORE_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const startOrder = () => async (dispatch: any) => {
	try {
		const res = await api.post('/shopifystore/startorder');

		dispatch({
			type: START_ORDER,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: STORE_ERROR,
			payload: error,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
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
	} catch (error) {
		dispatch({
			type: STORE_ERROR,
			payload: error,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const submitShippingInfo = (formData: any, toggle: boolean) => async (dispatch: any) => {
	try {
		const res = await api.post('/shopifystore/updateaddress', formData);

		dispatch({
			type: SUBMIT_SHIPPING,
			payload: res.data,
		});

		dispatch(setAlert('We have received your shipping info', 'success'));

		dispatch({
			type: SAVE_SHIPPING,
			payload: toggle,
		});
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			dispatch({
				type: SHIPPING_ERROR,
				payload: errors,
			});
			errors.forEach((err: any) => dispatch(setAlert(err.msg, 'danger')));
			dispatch({
				type: SAVE_SHIPPING,
				payload: false,
			});
			return;
		}
		dispatch({
			type: SHIPPING_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.msg, 'danger'));
		dispatch({
			type: SAVE_SHIPPING,
			payload: false,
		});
	}
};

export const toggleShippingModule = (data: boolean) => async (dispatch: any) => {
	dispatch({
		type: SAVE_SHIPPING,
		payload: data,
	});
};

export const processCheckout = (formData: any, id: string) => async (dispatch: any) => {
	try {
		const res = await api.post(`/shopifystore/processcheckout/${id}`, formData);
		dispatch({
			type: PROCESS_CHECKOUT,
			payload: res.data,
		});
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			dispatch({
				type: STORE_ERROR,
				payload: errors,
			});
			errors.forEach((err: any) => dispatch(setAlert(err.msg, 'danger')));
		}
		dispatch({
			type: STORE_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.msg, 'danger'));
	}
};
