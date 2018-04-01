import React from "react";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";

const NavBar = () => (

	<Navbar inverse collapseOnSelect fixedTop>
		<Navbar.Header>
			<Navbar.Brand>
				<LinkContainer to="/">
					<a>Git My Stats</a>
				</LinkContainer>
			</Navbar.Brand>
			<Navbar.Toggle />
		</Navbar.Header>
		<Navbar.Collapse>
			<Nav>

				{/* <LinkContainer to="/projects">
					<NavItem eventKey={1}>
              Projects
					</NavItem>
				</LinkContainer> */}
				{/* <LinkContainer to="/about">
					<NavItem eventKey={2}>
              About Me
					</NavItem>
				</LinkContainer>
				<LinkContainer to="/contact">
					<NavItem eventKey={3}>
              Contact
					</NavItem>
				</LinkContainer> */}

			</Nav>
		</Navbar.Collapse>
	</Navbar>

);

export default NavBar;
