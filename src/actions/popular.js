import {api} from '../services';

export const LOAD_POPULAR_MOVIE_REQUEST = 'LOAD_POPULAR_MOVIE_REQUEST';
export const LOAD_POPULAR_MOVIE_SUCCESS = 'LOAD_POPULAR_MOVIE_SUCCESS';
export const LOAD_POPULAR_MOVIE_ERROR   = 'LOAD_POPULAR_MOVIE_ERROR';

export const LoadPopularMovie = () => {
	return (dispatch) => {
		dispatch(onLoadPopularMovie.request());
		return onLoadPopularMovie.fetch()
			.then(({ data }) => {
				dispatch(onLoadPopularMovie.success(data.results));
			})
			.catch((error) => {
				dispatch(onLoadPopularMovie.error(error))
			});
	}
};

const onLoadPopularMovie = {
	request: () => ({
		type: LOAD_POPULAR_MOVIE_REQUEST
	}),
	fetch: () => {
		return api.request.get(`movie/popular?page=1`);
	},
	success: (payload) => {
		return {
			type: LOAD_POPULAR_MOVIE_SUCCESS,
			payload
		}
	},
	error: (payload) => ({
		type: LOAD_POPULAR_MOVIE_ERROR,
		errors: payload
	})
};