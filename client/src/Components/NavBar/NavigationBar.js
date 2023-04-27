// Imported Libraries
import React, { useContext, useState, useEffect } from "react";
import { Navbar, Button, Dropdown } from "flowbite-react";

// Imported local depenencies
import NavigationLink from "./NavigationLink";

// Imported icons
import { FaUserCircle } from "react-icons/fa";

function NavigationBar(props) {
	const [loginType, setloginType] = useState("student");
	const [routes, setRoutes] = useState(null);
	// const loginType = useContext(second);

	useEffect( () => {
		if (loginType === "student") {
			setRoutes( () =>
				<Navbar.Collapse>
					<NavigationLink target="/">Home</NavigationLink>
					<NavigationLink target="/test">Schedule</NavigationLink>
					<NavigationLink target="/">Bookings</NavigationLink>
				</Navbar.Collapse>
			);
		} else if (loginType === "admin") {
			setRoutes( () =>
				<Navbar.Collapse>
					<NavigationLink target="/">Dashboard</NavigationLink>
					<NavigationLink target="/admin/rooms">Rooms</NavigationLink>
				</Navbar.Collapse>
			);
		}
	}, [])

	return (
		<div className={props.className}>
			<Navbar fluid={true} rounded={true}>
				<Navbar.Brand href="https://flowbite.com/">
					<img
						src="https://flowbite.com/docs/images/logo.svg"
						className="mr-3 h-6 sm:h-9"
						alt="Flowbite Logo"
					/>
					<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
						Room Booking System
					</span>
				</Navbar.Brand>
				<div className="flex flex-row md:order-2 justify-center align-middle items-center gap-2 me-5">
					<Dropdown
						arrowIcon={false}
						inline={true}
						label={
							<FaUserCircle
								className="text-gray-400 hover:text-gray-500 align-middle"
								size={24}
							/>
						}
					>
						<Dropdown.Header>
							<span className="block text-sm">Bonnie Green</span>
							<span className="block truncate text-sm font-medium">
								name@flowbite.com
							</span>
						</Dropdown.Header>
						<Dropdown.Item onClick={() => setloginType("admin")}>
							Sign out
						</Dropdown.Item>
						<Dropdown.Item onClick={() => setloginType("student")}>
							Sign in
						</Dropdown.Item>
					</Dropdown>
					<Navbar.Toggle />
				</div>
				{routes}
			</Navbar>
		</div>
	);
}

export default NavigationBar;
