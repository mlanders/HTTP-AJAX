import React from 'react';
import { Button } from 'reactstrap';

function Friend(props) {
	console.log(props.friends);
	let currentFriend = props.friends.find(
		friend => friend.id.toString() === props.match.params.id
	);

	if (!currentFriend)
		return (
			<div className="lost">
				<h2>Cannot find that friend!</h2>
			</div>
		);

	return (
		<div className="friendWrapper">
			<div className="friendInfo">
				<h1>{currentFriend.name}</h1>
				<p>Age: {currentFriend.age}</p>
				<p>Email: {currentFriend.email}</p>
			</div>
			<div className="friendButtons">
				<Button
					color="primary"
					className="friendButton"
					onClick={e => props.handleUpdate(e, currentFriend.id)}>
					Update
				</Button>
				<Button
					color="primary"
					className="friendButton"
					onClick={e => props.handleDelete(e, currentFriend.id)}>
					Delete
				</Button>
			</div>
		</div>
	);
}

export default Friend;
