import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';

import rootReducer from './reducers';

let middlewares = [thunk];

const configureStore = createStore(
	rootReducer,
	compose(
	  applyMiddleware(...middlewares),
	  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
	)
  )


export default configureStore;