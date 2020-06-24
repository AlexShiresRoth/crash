import { FETCH_EVENTS, EVENT_ERROR } from './types';
import api from '../utils/api';

export const fetchEvents = () => async (dispatch: any) => {
	try {
		const res = await api.get('/events');
		dispatch({
			type: FETCH_EVENTS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: EVENT_ERROR,
			payload: error.response.data.msg,
		});
	}
};
