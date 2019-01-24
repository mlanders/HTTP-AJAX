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
			friend: {
				name: '',
				age: '',
				email: '',
			},
		};
	}
	update() {
		axios
			.get('http://localhost:5000/friends')
			.then(response =>
				this.setState(
					{
						friends: response.data,
						error: '',
						friend: {
							name: '',
							age: '',
							email: '',
						},
					},
					console.log(`update ${response}`)
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

	componentDidMount() {
		axios
			.get('http://localhost:5000/friends')
			.then(response =>
				this.setState(
					{
						friends: response.data,
						error: '',
					},
					console.log(`componentDidMount${response}`)
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
	handleChange = e => {
		this.setState({
			friend: {
				...this.state.friend,
				[e.target.name]: e.target.value,
			},
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		this.postMessage(e, this.state.friend);
	};

	postMessage = (e, friend) => {
		e.preventDefault();
		axios
			.post(`http://localhost:5000/friends`, friend)
			.then(response => {
				console.log(`post response ${response}`);
				this.update();
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div className="App">
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="name"
						placeholder="Name"
						value={this.state.friend.name}
						onChange={this.handleChange}
					/>
					<input
						type="number"
						name="age"
						placeholder="Age"
						value={this.state.friend.age}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="email"
						placeholder="Email"
						value={this.state.friend.email}
						onChange={this.handleChange}
					/>
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
