import api from '../utils/api';
import {
	FETCH_STORE,
	STORE_ERROR,
	ADD_TO_CART,
	REMOVE_FROM_CART,
	SEARCH_STORE,
	FETCH_IMAGES,
	FETCH_CATEGORIES,
} from './types';
import { setAlert } from './alert';

export const fetchStoreItems = () => async (dispatch: any) => {
	try {
		const res = await api.get('/store');
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

export const fetchCatalogImages = () => async (dispatch: any) => {
	try {
		const res = await api.get('/store/catalogimages');
		console.log(res);
		dispatch({
			type: FETCH_IMAGES,
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
		const res = await api.post('/store', data);

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

export const addToCart = (cartItem: any) => async (dispatch: any) => {
	try {
		dispatch({
			type: ADD_TO_CART,
			payload: cartItem,
		});
	} catch (error) {
		dispatch({
			type: STORE_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const removeFromCart = (id: string) => async (dispatch: any) => {
	//must always receive an id
	try {
		dispatch({
			type: REMOVE_FROM_CART,
			payload: id,
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
