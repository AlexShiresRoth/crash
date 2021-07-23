import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router';

interface Props {
	location: any;
}
const RedirectExternal = ({ location }: Props) => {
	console.log(location);
	const locationState = location;

	useEffect(() => {
		if (locationState) window.location.href = locationState;
	}, [locationState]);

	if (!locationState || locationState === null) {
		return <Redirect to="/merch" />;
	}

	return <Route exact path="/redirect" render={() => (window.location.href = locationState)} />;
};

export default RedirectExternal;
