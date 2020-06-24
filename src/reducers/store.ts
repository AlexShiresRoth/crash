import { FETCH_STORE } from '../actions/types';

const initialState = {
	catalog: [],
	loading: true,
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
		default:
			return state;
	}
};
