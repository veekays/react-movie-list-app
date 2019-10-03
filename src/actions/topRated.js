import {api} from '../services';

export const LOAD_TOPRATED_MOVIE_REQUEST = 'LOAD_TOPRATED_MOVIE_REQUEST';
export const LOAD_TOPRATED_MOVIE_SUCCESS = 'LOAD_TOPRATED_MOVIE_SUCCESS';
export const LOAD_TOPRATED_MOVIE_ERROR   = 'LOAD_TOPRATED_MOVIE_ERROR';

export const LoadTopRatedMovie = () => {
	return (dispatch) => {
		dispatch(onLoadTopRatedMovie.request());
		return onLoadTopRatedMovie.fetch()
			.then(({ data }) => {
				dispatch(onLoadTopRatedMovie.success(data.results));
			})
			.catch((error) => {
				dispatch(onLoadTopRatedMovie.error(error))
			});
	}
};

const onLoadTopRatedMovie = {
	request: () => ({
		type: LOAD_TOPRATED_MOVIE_REQUEST
	}),
	fetch: () => {
		return api.request.get(`movie/top_rated?page=1`);
	},
	success: (payload) => {
		return {
			type: LOAD_TOPRATED_MOVIE_SUCCESS,
			payload
		}
	},
	error: (payload) => ({
		type: LOAD_TOPRATED_MOVIE_ERROR,
		errors: payload
	})
};