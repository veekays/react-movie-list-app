import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import config from '../config';
import { storage } from '../services';

import { LoadMovie } from '../actions/movie';
import { LoadGenres } from '../actions/genres';

class Movie extends Component {
	constructor(props){
		super(props);
		this.addToWatchList = this.addToWatchList.bind(this);
		this.state = {
			watch_list:[]
		}
	}

	static path = '/movie/:movie_id(\\d+)/:cast?';

	addToWatchList = () => {
		const watchListStorage = storage.get('watch_list');
		let tempValue = '';
		if( (this.state.watch_list.indexOf(this.props.movie.id.toString()) == '-1') ){
			if( watchListStorage ){
				tempValue = JSON.parse(watchListStorage);
				tempValue[this.props.movie.id] = this.props.movie;
				storage.set('watch_list', JSON.stringify(tempValue));			
			}
			else{
				tempValue = {
					[this.props.movie.id]: this.props.movie  
				};
				storage.set('watch_list', JSON.stringify(tempValue));
			}
			this.setState({
				watch_list: Object.keys(tempValue)
			})
		}
	}

	componentWillMount(){
		if( storage.get('watch_list') ){
			let initStateWithList = Object.keys(JSON.parse(storage.get('watch_list')));
			this.setState({
				watch_list: initStateWithList
			})
		}
	}

	componentDidMount(){
		const { match, LoadMovie, LoadGenres } = this.props;
		LoadGenres();
		LoadMovie(match.params.movie_id);
	}

	componentWillReceiveProps(nextProps) {
		const { match, LoadMovie } = this.props;
		if(match.params.movie_id !== nextProps.match.params.movie_id ){
			LoadMovie(nextProps.match.params.movie_id);
		}
	}

	convertMinsToHrsMins = (mins) => {
		let h = Math.floor(mins / 60);
		let m = mins % 60;
		h = h < 10 ? h : h;
		m = m < 10 ? '0' + m : m;
		return `${h}:${m}`;
	};

	moneySpace = (money) => {
		let parts = money.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		return parts.join(".");
	};

	imageLoaded = (e) => {
		e.target.classList.add('img-loaded');
	};

	render(){

		const { movie, isFetched, t } = this.props;
	

		if(!isFetched)
			return (
				<div className="loading-box"></div>
			);

		return (
			<div>
				<div className="movie-single">
					<div className="movie-single-inner">
						<div className={`movie-rating`}>{movie.vote_average}</div>
						<div className="movie-poster">
							<img src={`${config.API_IMAGE.medium}/${movie.poster_path}`} onLoad={this.imageLoaded}/>
						</div>
						<div onClick={this.addToWatchList} className={`watchlist_banner movie-rating ${(this.state.watch_list.indexOf(this.props.movie.id.toString()) != '-1') && 'movie-rating-positive'}`}>{(this.state.watch_list.indexOf(this.props.movie.id.toString()) != '-1') ? 'Added to watchlist' : 'Add to watchlist' }</div>

						<div className="movie-details">
							<div className="movie-title">
								<span>Title:</span>
								{movie.title}
							</div>
							{movie.overview ? (
								<div className="movie-description">
									<span>Overview:</span>
									{movie.overview}
								</div>
							) : ''}
							{movie.release_date ? (
								<div className="movie-item">
									<span>Release date:</span>
									{movie.release_date.split('-').reverse().join('-')}
								</div>
							) : ''}
							<div className="movie-item">
								<span>Duration:</span>
								{this.convertMinsToHrsMins(movie.runtime)}
							</div>
							<ul className="movie-genres">
								{movie.genres && movie.genres.map(item => {
									return (
										<li key={item.id}>{item.name}</li>
									)
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadMovie,
		LoadGenres,
	},
	dispatch
);

const mapStateToProps = (state) => {
	return {
		movie: state.movie.data,
		isFetched: state.movie.isFetched,
	};
};

export default (connect(mapStateToProps, mapDispatchToProps)(Movie));