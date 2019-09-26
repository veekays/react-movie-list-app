import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import genres from './genres';
import system from './system';
import images from './images';
import movie from './movie';
import movies from './movies';

export default combineReducers({
	routing: routerReducer,
	genres,
	system,
	movie,
	images,
	movies
});