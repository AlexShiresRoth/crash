import { FETCH_EVENTS, EVENT_ERROR } from './types';
import api from '../utils/api';
import { bitId } from '../utils/bit';

export const fetchEvents = () => async (dispatch: any) => {
	try {
		const res = await api.get(
			`https://rest.bandsintown.com/artists/crashthecalm/events?app_id=${bitId}&date=upcoming`
		);

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
