import api from '../utils/api';
import { FETCH_STORE, STORE_ERROR } from './types';
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
			dispatch(errors.map((err: any) => setAlert(err.response.data.msg, 'danger')));
			return;
		}
		dispatch({
			type: STORE_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};
