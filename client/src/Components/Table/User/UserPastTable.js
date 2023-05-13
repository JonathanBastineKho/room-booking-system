// Imported Libraries
import { Table } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";

// Imported local dependencies
import UserPastTableRow from "./UserPastTableRow";
import axios from "axios";
import { AuthContext } from "../../Authentication/AuthContext";

function UserPastTable(props) {
	const [bookings, setBookings] = useState([]);
	const { token, logout } = useContext(AuthContext);

	useEffect(() => {
		getPastBookings();
	}, []);

	const getPastBookings = () => {
		if (token) {
			axios
				.get("/api/view_past_bookings", {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					const temp = [];
					// console.log(res.data.bookings)
					res.data.bookings.forEach((rows) => {
						let temp_dict = {
							name: rows.roomName,
							start: new Date(rows.startDateTime),
							end: new Date(rows.endDateTime),
							fee: rows.bookingPrice,
						};
						temp.push(temp_dict);
					});
					setBookings(temp);
				})
				.catch((error) => {
					console.log(error);
					logout();
				});
		}
	};

	return (
		<Table hoverable={props.hoverable}>
			<Table.Head>
				<Table.HeadCell>Room name</Table.HeadCell>
				<Table.HeadCell>Booking Date</Table.HeadCell>
				<Table.HeadCell>Booking Time</Table.HeadCell>
				<Table.HeadCell>Duration</Table.HeadCell>
				<Table.HeadCell>Fee</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y">
				{bookings.map((value) => (
					<UserPastTableRow key={(value.name, value.start)} data={value} />
				))}
				<Table.Row
					className={
						bookings.length > 0
							? "hidden"
							: "bg-white dark:border-gray-700 dark:bg-gray-800"
					}
				>
					<Table.Cell colSpan={5} className="w-[55rem] text-center">
						No past bookings.
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	);
}

export default UserPastTable;
