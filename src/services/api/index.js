import axios from 'axios';
import config from '../../config';
import store from '../../store';

let state = store.getState();

axios.defaults.params = {};
axios.defaults.params['api_key'] = config.API_KEY;

store.subscribe(() => {
	state = store.getState();
});

export default {
	request: axios.create({
		baseURL: config.API_ROOT
	}),
	requestWOL: axios.create({
		baseURL: config.API_ROOT,
		params: {
			language: 'null',
			api_key: config.API_KEY
		}
	})
};