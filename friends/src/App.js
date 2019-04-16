import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Friends from './components/Friends';
import Friend from './components/Friend';
import MultiForm from './components/Form';
import Navigation from './components/Nav';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			friends: [],
			error: [],
			isUpdate: false,
			isHovered: false,
			friend: {
				name: '',
				age: '',
				email: '',
			},
		};
	}

	reset = () => {
		this.setState({
			error: [],
			isUpdate: false,
			friend: {
				name: '',
				age: '',
				email: '',
			},
		});
	};
	//componentDidMount -  does a get request to the friends API
	componentDidMount() {
		axios
			.get('http://localhost:5000/friends')
			.then(response =>
				this.setState(
					{
						friends: response.data,
						error: '',
					},
					console.log(`componentDidMount - ${response}`)
				)
			)
			.catch(err =>
				this.setState(
					{
						error: err,
					},
					console.log(`componentDidMount - ${err}`)
				)
			);
	}

	// handleChange - updates the state with the values entered in the form
	handleChange = e => {
		if (e.target.name === 'age') {
			let setAge = Number(e.target.value);
			this.setState({
				friend: {
					...this.state.friend,
					age: setAge,
				},
			});
		} else {
			this.setState({
				friend: {
					...this.state.friend,
					[e.target.name]: e.target.value,
				},
			});
		}
	};

	// handleSubmit - runs postMessage function
	handleSubmit = e => {
		e.preventDefault();
		let friend = this.state.friend;
		axios
			.post(`http://localhost:5000/friends`, friend)
			.then(response => {
				console.log(`handleSubmit - ${response}`);
				// this.update();
				this.setState(
					{
						friends: response.data,
						isUpdate: false,
					},
					this.props.history.push('/')
				);
			})
			.catch(err => console.log(`handleSubmit - ${err}`));
	};

	// handleDelete - runs postMessage function
	handleDelete = (e, id) => {
		e.preventDefault();
		axios
			.delete(`http://localhost:5000/friends/${id}`)
			.then(response => {
				console.log(`handleDelete - ${response}`);
				this.setState(
					{
						friends: response.data,
					},
					this.props.history.push('/')
				);
			})
			.catch(err =>
				this.setState(
					{
						error: err,
					},
					console.log(`handleDelete - ${err}`)
				)
			);
	};

	handleUpdate = (e, id) => {
		e.preventDefault();
		this.setState(
			{
				friend: this.state.friends.find(friend => friend.id === id),
				isUpdate: true,
			},
			this.props.history.push('/form')
		);
	};
	putChange = e => {
		e.preventDefault();
		let id = this.state.friend.id;
		axios
			.put(`http://localhost:5000/friends/${id}`, this.state.friend)
			.then(response => {
				console.log(`putChange - ${response}`);
				// this.update();
				this.setState(
					{
						friends: response.data,
						error: [],
						isUpdate: false,
						friend: {
							name: '',
							age: '',
							email: '',
						},
					},
					this.props.history.push('/')
				);
			})
			.catch(err =>
				this.setState(
					{
						error: err,
					},
					console.log(`putChange - ${err}`)
				)
			);
	};

	handleHover = () => {
		this.setState({
			isHovered: !this.state.isHovered,
		});
	};

	render() {
		return (
			<div className="App">
				<Navigation reset={this.reset} />

				{this.state.error && <h4>{this.state.error}</h4>}

				<Route
					exact
					path="/form"
					render={props => (
						<MultiForm
							{...props}
							handleChange={this.handleChange}
							putChange={this.putChange}
							handleSubmit={this.handleSubmit}
							isUpdate={this.state.isUpdate}
							friend={this.state.friend}
						/>
					)}
				/>

				<Route
					exact
					path="/"
					render={props => (
						<Friends
							{...props}
							handleDelete={this.handleDelete}
							handleUpdate={this.handleUpdate}
							friends={this.state.friends}
							isHovered={this.state.isHovered}
							handleHover={this.handleHover}
						/>
					)}
				/>
				<Route
					path="/friend/:id"
					render={props => (
						<Friend
							{...props}
							handleDelete={this.handleDelete}
							handleUpdate={this.handleUpdate}
							friends={this.state.friends}
						/>
					)}
				/>
			</div>
		);
	}
}

export default App;
