import { FETCH_VIDEOS } from './types';
import axios from 'axios';

export const fetchVideos = () => async (dispatch: any) => {
	const key = 'AIzaSyDFmPHtUMdOvCkSkI2XAGZ5t-Gjy42kFZM';

	try {
		const fetch = axios.create({
			baseURL: 'https://www.googleapis.com/youtube/v3/search',
		});

		const res = await fetch.get('/', {
			params: {
				part: 'snippet',
				q: 'crash+the+calm',
				maxResults: 5,
				key: key,
			},
		});
		console.log(res.data);
		dispatch({
			type: FETCH_VIDEOS,
			payload: res.data.items,
		});
	} catch (error) {
		console.log(error.response);
	}
};
