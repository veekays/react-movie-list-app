import React, { Component } from 'react';
import MovieItem from '../components/MovieItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ChangeFilter } from '../actions/movies';
import { LoadPopularMovie } from '../actions/popular';
import { LoadTopRatedMovie } from '../actions/topRated';


class Root extends Component {
    
    static path = '/';
    constructor() {
        super();
        this.state = {
            topRatedList: [],
        }
    }

    componentWillMount() {
        const {LoadPopularMovie, LoadTopRatedMovie} = this.props;
        LoadPopularMovie();
        LoadTopRatedMovie();
    }

    handleClick(item){
        this.props.ChangeFilter(item);
    }

    render() {
        const { popularList, topRatedList, isFetchedTopRated, isFetchedPopular } = this.props;
        if (!isFetchedTopRated || !isFetchedPopular)
            return (
                <div className="loading-box"></div>
            );
        return (
            <div>
                <div className="root-page-wrapper">
                    <h3>Popular Movies</h3>
                    <div className="movies">
                        <div className="movies-inner">
                            {
                                isFetchedPopular ? popularList.length > 0 && popularList.splice(0,10).map(movie => (
                                <MovieItem key={movie.id} movie={movie} />
                            )) : null}
                        </div>
                    </div>
                    <Link to={'/allmovies'}>
                        <div className="watchlist-button" onClick={this.handleClick.bind(this, 'popular')}><ul><li>View more</li></ul></div>
                    </Link>
                </div>
                <div className="root-page-wrapper">
                    <h3>Top Rated Movies</h3>
                    <div className="movies">
                        <div className="movies-inner">
                            { isFetchedTopRated ? topRatedList.length > 0 && topRatedList.splice(0,10).map(movie => (
                                <MovieItem key={movie.id} movie={movie} />
                            )) : null}
                        </div>
                    </div>
                    <Link to={'/allmovies'}>
                        <div className="watchlist-button" onClick={this.handleClick.bind(this, 'top_rated')}><ul><li>View more</li></ul>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        ChangeFilter,
        LoadPopularMovie,
        LoadTopRatedMovie
    },
    dispatch
);
const mapStateToProps = (state) => {
    return {
        filter: state.movies.filter,
        popularList : state.popular.data,
        isFetchedPopular : state.popular.isFetched,
        topRatedList : state.topRated.data,
        isFetchedTopRated : state.topRated.isFetched
    };
};
export default (connect(mapStateToProps, mapDispatchToProps)(Root));