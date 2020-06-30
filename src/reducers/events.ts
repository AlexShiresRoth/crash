import { FETCH_EVENTS } from '../actions/types';

const initialState = {
	loading: true,
	events: [],
};

export default (state = initialState, action: any) => {
	const { type, payload } = action;

	switch (type) {
		case FETCH_EVENTS:
			return {
				...state,
				events: payload.reverse(),
				loading: false,
			};
		default:
			return state;
	}
};
