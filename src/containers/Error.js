import React, { Component } from 'react';
import ErrorBg from '../assets/img/404.jpg'

class Error extends Component {
	render(){

		const { t } = this.props;

		return (
			<div>
				<div className="error-bg-wrapper">
					<img src={ErrorBg} alt="Error Bg"/>
				</div>
			</div>
		)
	}
}

export default (Error);