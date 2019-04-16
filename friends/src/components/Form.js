import React from 'react';
import { Button, Input, Form } from 'reactstrap';

function MultiForm(props) {
	function formSubmit(e) {
		e.preventDefault();
		if (props.isUpdate) {
			props.putChange(e);
		} else {
			props.handleSubmit(e);
		}
	}
	return (
		<Form className="multiForm" onSubmit={formSubmit}>
			<Input
				required
				type="text"
				name="name"
				placeholder="Name"
				value={props.friend.name}
				onChange={props.handleChange}
			/>
			<Input
				type="number"
				name="age"
				placeholder="Age"
				value={props.friend.age}
				onChange={props.handleChange}
			/>
			<Input
				type="email"
				name="email"
				placeholder="Email"
				value={props.friend.email}
				onChange={props.handleChange}
			/>
			<Button className="formButton" type="submit">
				{props.isUpdate ? 'Update' : 'Add'}
			</Button>
		</Form>
	);
}

export default MultiForm;
