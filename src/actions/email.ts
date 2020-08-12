import api from '../utils/api';
import { EMAIL_SIGNUP, EMAIL_ERROR } from './types';

export const emailSignup = (data: any) => async (dispatch: any) => {
	try {
		const res = await api.post('/email/signup', data);
		dispatch({
			type: EMAIL_SIGNUP,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: EMAIL_ERROR,
			payload: error,
		});
	}
};
