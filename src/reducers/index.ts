import { combineReducers } from 'redux';
import youtube from './youtube';
import store from './store';
import events from './events';
import email from './email';

export default combineReducers({
	youtube,
	store,
	events,
	email,
});
