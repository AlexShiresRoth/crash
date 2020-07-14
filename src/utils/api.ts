import axios from 'axios';

const devUrl = 'http://localhost:5000/api';
// const url = `https://crash-the-calm.herokuapp.com/api`;
const api = axios.create({
	baseURL: devUrl,
	headers: {
		'Content-Type': 'application/json',
	},
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/

api.interceptors.response.use(
	(res) => res,
	(err) => {
		console.error(err.response);
		return Promise.reject(err);
	}
);

export default api;
