// Imported Libraries
import { Table } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

// Imported local dependencies
import UserCurrentTableRow from "./UserCurrentTableRow";
import { AuthContext } from "../../Authentication/AuthContext";

function UserCurrentTable(props) {
	const { token, logout } = useContext(AuthContext);
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		getCurrentBookings();
	}, []);

	const getCurrentBookings = () => {
		if (token) {
			axios
				.get("/api/current_bookings", {
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

	// Dummy cancel -> change with props.cancelBooking with MODAL AND API
	const cancelBooking = (name, start) => {
		console.log(token);
		if (token) {
			axios
				.delete("/api/cancel_bookings", {
					data: {
						roomName: name,
						startDateTime: format(start, "yyyy-MM-dd HH"),
					},
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				})
				.then((res) => {
					console.log(res.data.message);
					if (res.data.success) {
						getCurrentBookings();
					} else {
						alert(res.data.message);
					}
				})
				.catch((error) => {
					console.log(error);
					logout();
				});
		}
	};

	// Dummy modify -> change with props.modifyBooking to open MODAL AND API
	const modifyBooking = (name, start, newStart, newEnd) => {
		console.log(token);
		if (token) {
			axios
				.patch(
					"/api/modify_bookings",
					{
						roomName: name,
						startDateTime: format(start, "yyyy-MM-dd HH"),
						newStartDateTime: format(newStart, "yyyy-MM-dd HH"),
						newEndDateTime: format(newEnd, "yyyy-MM-dd HH"),
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				)
				.then((res) => {
					console.log(res.data.message);
					if (res.data.success) {
						getCurrentBookings();
					} else {
						alert(res.data.message);
					}
				})
				.catch((error) => {
					console.log(error);
					console.log({
						roomName: name,
						startDateTime: format(start, "yyyy-MM-dd HH"),
						newStartDateTime: format(newStart, "yyyy-MM-dd HH"),
						newEndDateTime: format(newEnd, "yyyy-MM-dd HH"),
					});
					// logout();
				});
		}
	};

	return (
		<Table hoverable={props.hoverable}>
			<Table.Head>
				<Table.HeadCell>Room name</Table.HeadCell>
				<Table.HeadCell>Booking Date</Table.HeadCell>
				<Table.HeadCell>Booking Time</Table.HeadCell>
				<Table.HeadCell>
					<span className="sr-only">Modify</span>
				</Table.HeadCell>
				<Table.HeadCell>
					<span className="sr-only">Cancel</span>
				</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y">
				{bookings.map((value) => (
					<UserCurrentTableRow
						key={(value.name, value.start)}
						data={value}
						cancelBooking={cancelBooking}
						modifyBooking={modifyBooking}
					/>
				))}
				<Table.Row
					className={
						bookings.length > 0
							? "hidden"
							: "bg-white dark:border-gray-700 dark:bg-gray-800"
					}
				>
					<Table.Cell colSpan={5} className="w-full">
						<span className="text-lg font-semibold">
                            No Current Bookings
                        </span>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	);
}

export default UserCurrentTable;
