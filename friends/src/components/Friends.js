import React from 'react';
import { Link } from 'react-router-dom';

function Friends(props) {
	// const iconClass = props.isHovered ? 'display' : '';

	return props.friends.map(friend => (
		<Link
			className="friendRow"
			to={`/friend/${friend.id}`}
			key={friend.id}
			// onMouseEnter={props.handleHover}
			// onMouseLeave={props.handleHover}
		>
			{friend.name}
			<div className="icons">
				<i
					// className={` ${iconClass} icon far fa-edit`}
					className=" icon far fa-edit"
					onClick={e => props.handleUpdate(e, friend.id)}
				/>
				<i
					// className={` ${iconClass} icon far fa-trash-alt`}
					className="icon far fa-trash-alt"
					onClick={e => props.handleDelete(e, friend.id)}
				/>
			</div>
		</Link>
	));
}

export default Friends;
