import React from 'react';
import './css/main.css';
import { Landing } from './components/pages/Landing';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Main } from './components/pages/Main';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route exact path="/main" component={Main} />
			</Switch>
		</Router>
	);
}

export default App;
