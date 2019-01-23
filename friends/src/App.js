import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Friends from './components/Friends';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			friends: [],
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/friends')
			.then(response =>
				this.setState({
					friends: response.data.message,
					error: '',
				})
			)
			.catch(err =>
				this.setState({
					error: err.response.data.message,
				})
			);
	}

	render() {
		return (
			<div className="App">
				<Route
					to="/:id"
					render={props => (
						<Friends {...props} friends={this.state.friends} />
					)}
				/>
				<Friends />
			</div>
		);
	}
}

export default App;
