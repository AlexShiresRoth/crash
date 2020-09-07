import { EMAIL_SIGNUP, EMAIL_ERROR } from '../actions/types';

const initialState = {
	emailResponse: null,
	loading: true,
	errors: null,
};

export default (state = initialState, action: any) => {
	const { type, payload } = action;
	switch (type) {
		case EMAIL_SIGNUP:
			return {
				...state,
				emailResponse: payload,
				errors: null,
				loading: false,
			};
		case EMAIL_ERROR:
			return {
				...state,
				errors: payload,
				loading: false,
			};
		default:
			return state;
	}
};
