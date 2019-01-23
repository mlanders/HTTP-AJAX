import React from 'react';
import { Link } from 'react-router-dom';

function Friend(props) {
	let currentFriend = '';
	currentFriend = props.friends.find(
		friend => friend.id.toString() === props.match.params.id
	);
	console.log(currentFriend);

	return (
		<div className="friendWrapper">
			<h1>{currentFriend.name}</h1>
			<p>Age: {currentFriend.age}</p>
			<p>Email: {currentFriend.email}</p>
			<Link to="/">
				<button>Home</button>
			</Link>
		</div>
	);
}

export default Friend;
