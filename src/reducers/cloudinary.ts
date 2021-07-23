import { RootStateOrAny } from 'react-redux';
import { CLOUDINARY_ERROR, LOAD_SONG_BOOK } from '../actions/types';

const initialState = {
	songbook: null,
	loadingSongBook: true,
	errors: null,
};

export default (state: RootStateOrAny = initialState, action: { type: string; payload: any }) => {
	const { type, payload } = action;

	switch (type) {
		case LOAD_SONG_BOOK:
			return {
				...state,
				songbook: payload,
				loadingSongBook: false,
			};
		case CLOUDINARY_ERROR:
			return {
				...state,
				songbook: null,
				errors: payload,
				loadigSongBook: false,
			};
		default:
			return state;
	}
};
