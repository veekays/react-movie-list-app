import React, { Component } from 'react';
import MoviesList from '../components/MoviesList';

class Home extends Component {

	static path = '/allmovies/:page(\\d+)?';

	render(){
		return (
			<div className="movies">
				<MoviesList/>
			</div>
		)
	}
}
export default (Home);