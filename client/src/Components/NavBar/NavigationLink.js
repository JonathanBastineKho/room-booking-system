import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

function NavigationLink(props) {
	return (
		<Navbar.Link active={props.active}>
			<Link to={props.target}>{props.children}</Link>
		</Navbar.Link>
	);
}

export default NavigationLink;
