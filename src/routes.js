import React from 'react';
import { Switch, Route } from "react-router-dom";

import Home from './containers/Home';
import Movie from './containers/Movie';
import Watchlist from './containers/Watchlist'
import Error from './containers/Error';
import Search from './containers/Search';
import Root from './containers/Root';

export default (
	<Switch>
		<Route exact path={Home.path} component={Home} />
		<Route exact path={Movie.path} component={Movie} />
		<Route exact path={Watchlist.path} component={Watchlist} />
		<Route exact path={Search.path} component={Search} />
		<Route exact path={Root.path} component={Root} />

		<Route component={Error}/>
	</Switch>
);