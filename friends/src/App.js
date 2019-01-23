import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Friends from './components/Friends';
import Friend from './components/Friend';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			friends: [],
			error: [],
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/friends')
			.then(response =>
				this.setState(
					{
						friends: response.data,
						error: '',
					},
					console.log(response)
				)
			)
			.catch(err =>
				this.setState(
					{
						error: err,
					},
					console.log(err)
				)
			);
	}

	render() {
		return (
			<div className="App">
				<form>
					<input type="text" name="name" placeholder="Name" />
					<input type="text" name="age" placeholder="Age" />
					<input type="text" name="email" placeholder="Email" />
					<button type="submit">Submit</button>
				</form>
				{this.state.error && <h4>{this.state.error}</h4>}
				<Route
					exact
					path="/"
					render={props => (
						<Friends {...props} friends={this.state.friends} />
					)}
				/>
				<Route
					path="/:id"
					render={props => (
						<Friend {...props} friends={this.state.friends} />
					)}
				/>
			</div>
		);
	}
}

export default App;
