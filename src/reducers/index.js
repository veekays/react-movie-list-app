import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import genres from './genres';
import movie from './movie';
import movies from './movies';

export default combineReducers({
	routing: routerReducer,
	genres,
	movie,
	movies
});