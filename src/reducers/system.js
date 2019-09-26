import * as Actions from '../actions/system';

const initialState = {
	
};

export default (state = initialState, action) => {
	switch (action.type) {
		case Actions.CHANGE_LANGUAGE:
			return {
				...state,
			};
		default:
			return state;
	}
};