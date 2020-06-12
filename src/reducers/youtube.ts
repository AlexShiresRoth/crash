import { FETCH_VIDEOS } from '../actions/types';

const initialState = {
	videos: [],
	loading: true,
};

export default (state = initialState, action: any) => {
	const { type, payload } = action;

	switch (type) {
		case FETCH_VIDEOS:
			return {
				...state,
				videos: payload,
				loading: false,
			};
		default:
			return state;
	}
};
