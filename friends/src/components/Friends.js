import React from 'react';
import { Link } from 'react-router-dom';

function Friends(props) {
	return props.friends.map(friend => (
		<Link to={`/${friend.id}`}>{friend.name}</Link>
	));
}

export default Friends;
