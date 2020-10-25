import React from 'react';
import './css/main.css';
import { Landing } from './components/pages/Landing';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Main } from './components/pages/Main';
import { Provider } from 'react-redux';
import store from './store';
import StorePage from './components/pages/StorePage';
import Epk from './components/pages/Epk';
import Checkout from './components/pages/Checkout';
import Videos from './components/pages/Videos';
import RedirectExternal from './components/reusablecomps/RedirectExternal';
import ItemPage from './components/pages/ItemPage';
import Single from './components/pages/Single';
import MusicPage from './components/pages/MusicPage';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/main" component={Main} />
					<Route exact path="/merch" component={StorePage} />
					<Route exact path="/epk" component={Epk} />
					<Route exact path="/checkout" component={Checkout} />
					<Route exact path="/videos" component={Videos} />
					<Route exact path="/redirect" component={RedirectExternal} />
					<Route exact path="/merch/viewitem/:id" component={ItemPage} />
					<Route exact path="/music/viewitem/:id" component={ItemPage} />
					<Route exact path="/devils" component={Single} />
					<Route exact path="/music" component={MusicPage} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
