import React from 'react';
import './css/main.css';
import { Landing } from './components/pages/Landing';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact to="/" component={Landing} />
			</Switch>
		</Router>
	);
}

export default App;
