import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storage } from '../services';


import config from '../config';

import { LoadGenres } from '../actions/genres';

class MovieItem extends Component {

	constructor(props){
		super(props);
		this.addToWatchList = this.addToWatchList.bind(this);
		this.state = {
			watch_list:[]
		}
	}

	imageLoaded = (e) => {
		e.target.classList.add('img-loaded');
	};

	componentWillMount(){
		if( storage.get('watch_list') ){
			let initStateWithList = Object.keys(JSON.parse(storage.get('watch_list')));
			this.setState({
				watch_list: initStateWithList
			})
		}
		const {LoadGenres} = this.props;
		LoadGenres();
	}

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

	render(){
		const { movie, genres, isFetched } = this.props;
		return (
			<div className="movie">
				<div className={`movie-rating`}>{movie.vote_average}</div>
				<Link to={`/movie/${movie.id}`} className="movie-poster">
					{movie.poster_path && (
						<img src={`${config.API_IMAGE.small}/${movie.poster_path}`} onLoad={this.imageLoaded}/>
					)}
				</Link>
				<div onClick={this.addToWatchList} className={`watchlist_banner movie-rating ${(this.state.watch_list.indexOf(this.props.movie.id.toString()) != '-1') && 'movie-rating-positive'}`}>{(this.state.watch_list.indexOf(this.props.movie.id.toString()) != '-1') ? 'Added to watchlist' : 'Add to watchlist' }</div>
				<Link to={`/movie/${movie.id}`} className="movie-title">
					{movie.title}
				</Link>
				<div className="movie-genres">
					<ul className="movie-genres">
						{isFetched && movie.genre_ids.map((id, index) => {
							const item = genres.filter(genre => genre.id === id);
							if(item.length)
								return (
									<li key={id}>{isFetched && item.shift().name}{index + 1 !== movie.genre_ids.length && ', '} </li>
								)
						})}
					</ul>
				</div>
			</div>
		)
	}
}


const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadGenres
	},
	dispatch
);
const mapStateToProps = (state) => {
	return {
		genres: state.genres.all,
		isFetched: state.genres.isFetched
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);