import * as Actions from '../actions/topRated';

const initialState = {
	data: {},
	isFetched: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOAD_TOPRATED_MOVIE_REQUEST:
			return {
				...state,
				data: {},
				isFetched: false
			};
		case Actions.LOAD_TOPRATED_MOVIE_SUCCESS:
			return {
				...state,
				data: action.payload,
				isFetched: true
			};
		default:
			return state;
	}
};