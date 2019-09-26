import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import config from '../config';
import { ChangeLang } from '../actions/system';
import { LoadSearchMovies } from '../actions/movies';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: ''
		}
	}
	searchInputChange = (e) => {
		this.setState({
			searchValue: e.target.value
		});
	};

	enterPressed = (e) => {
		e.persist();
		if (e.key === "Enter") {
			this.searchMovie()
		}
	}

	searchMovie = (e) => {
		const { history } = this.props;

		if (this.state.searchValue.length > 0) {
			history.push(`/search/${this.state.searchValue}`);
		} else {
			history.push(`/`);
		}
	}

	render() {
		const { searchText } = this.props;
		const languages = config.API_LANGUAGES;

		return (
			<header>
				<div className="container">
					<div className="content">
						<Link to={`/`} className="logo">
							<span style={{display:'flex'}}><i className="material-icons">
								signal_cellular_alt</i> {'MOVIES'}
							</span>
						</Link>
						<Link to={`/watchlist`}>
							<div className="watchlist-button">
								<ul>
									<li>WatchList</li>
								</ul>
							</div>
						</Link>
						<div className="header-search-field">
							<input type="text" placeholder="Search movies here..." onChange={this.searchInputChange} value={this.state.searchValue} onKeyPress={this.enterPressed} />
							<button className="search-btn" onClick={this.searchMovie}></button>
						</div>
					</div>
				</div>
			</header>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadSearchMovies
	},
	dispatch
);
const mapStateToProps = (state) => {
	return {
		searchText: state.movies.searchText,
	};
};
export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(Header)));