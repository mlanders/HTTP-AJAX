import React from 'react';
import { Link } from 'react-router-dom';

function Friends(props) {
	return props.friends.map(friend => (
		// <div className="friendRow">
		<Link className="friendRow" to={`/${friend.id}`} key={friend.id}>
			{friend.name}
			<button
				className="delete"
				onClick={e => props.handleDelete(e, friend.id)}>
				X
			</button>
		</Link>

		// </div>
	));
}

export default Friends;
