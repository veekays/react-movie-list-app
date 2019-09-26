import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './components/Header';

import routes from './routes';

import './assets/styles/normalize.css';
import './assets/styles/main.css';


class App extends Component {
	render() {
		return (
			<div className="wrapper">
				<Header/>
				<div className="container">
					{routes}
				</div>
			</div>
		)
	}
}

export default App;