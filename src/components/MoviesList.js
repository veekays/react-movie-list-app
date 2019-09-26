import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination from "react-js-pagination";

import {LoadGenres} from '../actions/genres';
import {LoadMovies, LoadSearchMovies} from '../actions/movies';

import MovieItem from '../components/MovieItem';

class MoviesList extends Component {

	componentDidMount(){
		const { match, LoadGenres, LoadMovies, filter } = this.props;
		LoadGenres();
		if( !match.params.query ){
			LoadMovies(match.params.page, filter);
		}
	}

	componentWillReceiveProps(nextProps) {
		const { match, LoadGenres, LoadMovies, LoadSearchMovies, filter, searchText } = this.props;
		if(nextProps.filter !== filter || nextProps.match.params.query !== match.params.query || nextProps.match.params.page !== match.params.page){
			LoadGenres();
			if(searchText.length === 0){
				LoadMovies(nextProps.match.params.page, nextProps.filter);
			} else {
				LoadSearchMovies(nextProps.match.params.query, nextProps.match.params.page);
			}

		}
	}

	handlePageChange = (pageNumber) => {
		const { history, LoadMovies, filter, searchText } = this.props;
		LoadMovies(pageNumber, filter);
		pageNumber = pageNumber > 1 ? `/allmovies/${pageNumber}` : '';
		if (searchText.length === 0) {
			history.push(`${pageNumber}`);
		} else {
			history.push(`/search/${searchText}${pageNumber}`);
		}
	};

	render(){
		const { movies, isFetched } = this.props;

		if(!isFetched)
			return (
				<div className="movies-list-container">
					<div className="loading-box"></div>
				</div>
			);

		return (
			<div className="movies-inner">
				{movies.results.length > 0 && movies.results.map(movie => (
					<MovieItem key={movie.id} movie={movie}/>
				))}
				{
					movies.results.length === 0 || movies.results.length < 0 ? 
					<div className="no-result-found"><h4>No result found</h4></div>: null
				}
				{
					movies.results.length > 0 &&
					<div className="pagination-container">
						<Pagination
							activePage={movies.page}
							itemsCountPerPage={20}
							totalItemsCount={movies.total_results}
							pageRangeDisplayed={5}
							onChange={this.handlePageChange}
						/>
					</div>
				}
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadGenres,
		LoadMovies,
		LoadSearchMovies
	},
	dispatch
);

const mapStateToProps = (state) => {
	return {
		movies: state.movies.all,
		searchText: state.movies.searchText,
		isFetched: state.movies.isFetched,
		filter: state.movies.filter,
	};
};

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesList)));