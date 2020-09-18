import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router';
import LoadingSpinner from './LoadingSpinner';

interface Props {
	location: any;
}
const RedirectExternal = ({ location }: Props) => {
	console.log(location.state);
	const locationState = location.state;

	useEffect(() => {
		if (locationState && locationState.redirect) window.location = locationState.redirect;
	}, [locationState]);

	if (!locationState || locationState === null) {
		return <Redirect to="/store" />;
	}
	const styleProps = {
		display: 'flex',
		height: '100vh',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	};

	return (
		<Route
			exact
			path="/redirect"
			render={() => (
				<div style={{ ...styleProps, flexDirection: 'column' }}>
					<p>Redirecting...</p>
					<LoadingSpinner />
				</div>
			)}
		/>
	);
};

export default RedirectExternal;
