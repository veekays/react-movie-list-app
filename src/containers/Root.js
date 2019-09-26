import React, { Component } from 'react';
import config from '../config'
import MovieItem from '../components/MovieItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ChangeFilter } from '../actions/movies';


class Root extends Component {
    
    static path = '/';
    constructor() {
        super();
        this.state = {
            popularList: [],
            topRatedList: [],
        }
    }

    componentWillMount() {
        let url = `https://api.themoviedb.org/3/movie/`
        fetch(`${url}popular?page=1&api_key=${config.API_KEY}`)
            .then(response => response.json())
            .then(resData => {
                this.setState({ popularList: resData.results.splice(0, 10) });
            })
        fetch(`${url}top_rated?page=1&api_key=${config.API_KEY}`)
            .then(response => response.json())
            .then(resData => {
                this.setState({ topRatedList: resData.results.splice(0, 10) });
            })
    }

    handleClick(item){
        this.props.ChangeFilter(item);
    }

    render() {
        const { popularList, topRatedList } = this.state
        return (
            <div>
                <div className="root-page-wrapper">
                    <h3>Popular Movies</h3>
                    <div className="movies">
                        <div className="movies-inner">
                            {popularList.length > 0 && popularList.map(movie => (
                                <MovieItem key={movie.id} movie={movie} />
                            ))}
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
                            {topRatedList.length > 0 && topRatedList.map(movie => (
                                <MovieItem key={movie.id} movie={movie} />
                            ))}
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
        ChangeFilter
    },
    dispatch
);
const mapStateToProps = (state) => {
    return {
        filter: state.movies.filter
    };
};
export default (connect(mapStateToProps, mapDispatchToProps)(Root));