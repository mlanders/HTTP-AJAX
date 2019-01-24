import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem, Nav } from 'reactstrap';

function Navigation(props) {
	return (
		<Navbar color="light" light>
			<NavbarBrand>
				<Link className="logo" onClick={() => props.reset()} to="/">
					Friends
				</Link>
			</NavbarBrand>
			{/* <div className="navButtons"> */}
			<Nav>
				<NavItem>
					<Link
						className="navButton"
						onClick={() => props.reset()}
						to="/">
						Home
					</Link>
				</NavItem>
				<NavItem>
					<Link
						className="navButton"
						onClick={() => props.reset()}
						to="/form">
						Add
					</Link>
				</NavItem>
			</Nav>
			{/* </div> */}
		</Navbar>
	);
}

export default Navigation;
