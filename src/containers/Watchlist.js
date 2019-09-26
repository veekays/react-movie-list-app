import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '../services';
import config from '../config';

class Watchlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			watch_list: []
		}
	}
	static path = '/watchlist';

	imageLoaded = (e) => {
		e.target.classList.add('img-loaded');
	};

	componentWillMount() {
		if (storage.get('watch_list')) {
			let initStateWithList = JSON.parse(storage.get('watch_list'));
			this.setState({
				watch_list: initStateWithList
			})
		}
	}

	render() {
		let that = this;
		let data = Object.keys(this.state.watch_list).map((movie, index, value) => {
			return (
				<div className={"movie"} key={index}>
					<div className={"movie-rating"}>{that.state.watch_list[movie].vote_average}</div>
					<Link to={`/movie/${that.state.watch_list[movie].id}`} className="movie-poster">
						{that.state.watch_list[movie].poster_path && (
							<img src={`${config.API_IMAGE.small}/${that.state.watch_list[movie].poster_path}`} onLoad={this.imageLoaded} />
						)}
					</Link>
					<Link to={`/movie/${that.state.watch_list[movie].id}`} className="movie-title">
						{that.state.watch_list[movie].title}
					</Link>

				</div>
			)
		}
		);
		return (
			<div className="movies">
				{
					data.length > 0 ?
						<div className="movies-inner">{data}</div> : <h3 className="watchlist-warning">{`You haven't added any movie to watchlist yet`}</h3>
				}
			</div>
		)
	}
}

export default Watchlist;