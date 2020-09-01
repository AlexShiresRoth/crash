import React from 'react';
import { Route, Redirect } from 'react-router';

interface Props {
	location: any;
}
const RedirectExternal = ({ location }: Props) => {
	console.log(location.state);
	const locationState = location.state;
	if (!locationState || locationState === null) {
		return <Redirect to="/store" />;
	}

	return <Route exact path="/redirect" render={() => (window.location = location.state.redirect)} />;
};

export default RedirectExternal;
