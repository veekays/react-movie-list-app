import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MoviesList from '../components/MoviesList';
import {LoadSearchMovies, ClearSearchText} from '../actions/movies';

class Search extends Component {

	static path = '/search/:query/:page?';

	componentDidMount(){
		const { match, LoadSearchMovies } = this.props;
		LoadSearchMovies(match.params.query, match.params.page);
	}

	componentWillReceiveProps(nextProps) {
		const { match, LoadSearchMovies } = this.props;
		if( nextProps.match.params.query !== match.params.query || nextProps.match.params.page !== match.params.page){
			LoadSearchMovies(nextProps.match.params.query, nextProps.match.params.page);
		}
	}

	componentWillUnmount(){
		this.props.ClearSearchText();
	}

	render(){
		return (
			<div className="movies">
				<MoviesList/>
			</div>
		)
	}
}
const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadSearchMovies,
		ClearSearchText
	},
	dispatch
);

export default (withRouter(connect(null, mapDispatchToProps)(Search)));