// Imported Libraries
import React, { useContext } from "react";
import { Navbar, Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

// Imported local depenencies
import NavigationLink from "./NavigationLink";

// Imported icons
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../Authentication/AuthContext";

function NavigationBar(props) {
    const { token, logout } = useContext(AuthContext);
	const user = jwtDecode(token);
	const navigate = useNavigate();

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
                            <span className="block text-sm">{user.sub}</span>
                            <span className="block truncate text-sm font-medium">
                                {user.email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item onClick={(event) => {
							logout();
							navigate("/login");
						}}>Sign out</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                {user.user_type === "Student" ? (
                    <Navbar.Collapse>
                        <NavigationLink target="/">Home</NavigationLink>
                        <NavigationLink target="/test">Schedule</NavigationLink>
                        <NavigationLink target="/#current_booking">Bookings</NavigationLink>
                    </Navbar.Collapse>
                ) : (
                    <Navbar.Collapse>
                        <NavigationLink target="/">Dashboard</NavigationLink>
                        <NavigationLink target="/admin/rooms">
                            Rooms
                        </NavigationLink>
                    </Navbar.Collapse>
                )}
            </Navbar>
        </div>
    );
}

export default NavigationBar;
