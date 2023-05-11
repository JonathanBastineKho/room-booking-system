// Imported Libraries
import { Button, Modal, Table } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format, setHours, setMonth } from "date-fns";

// Imported icons
import { HiOutlineExclamationCircle } from "react-icons/hi";

// Imported local dependencies
import UserCurrentTableRow from "./UserCurrentTableRow";
import { AuthContext } from "../../Authentication/AuthContext";

function UserCurrentTable(props) {
	// Dummy data -> change with props.data which will be extracted from API.
	// const data = [
	// 	{
	// 		name: "Room 1",
	// 		start: setHours(new Date(), 9),
	// 		end: setHours(new Date(), 10),
	// 	},
	// 	{
	// 		name: "Room 2",
	// 		start: setMonth(setHours(new Date(), 12), 11),
	// 		end: setHours(new Date(), 13),
	// 	},
	// 	{
	// 		name: "Room 3",
	// 		start: setHours(new Date(), 15),
	// 		end: setHours(new Date(), 17),
	// 	},
	// ];
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
					res.data.bookings.map((rows) => {
						console.log(rows.startDateTime);
						let temp_dict = {
							name: rows.roomName,
							start: new Date(rows.startDateTime.replace(" GMT", "")),
							end: new Date(rows.endDateTime.replace(" GMT", "")),
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
				.patch("/api/modify_bookings", {
					data: {
						roomName: name,
						startDateTime: format(start, "yyyy-MM-dd HH"),
						newStartDateTime: format(newStart, "yyyy-MM-dd HH"),
						newEndDateTime: format(newEnd, "yyyy-MM-dd HH"),
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
						data={value}
						cancelBooking={cancelBooking}
						modifyBooking={modifyBooking}
					/>
				))}
			</Table.Body>
			<Table.Row
				className={
					bookings.length > 0
						? "hidden"
						: "bg-white dark:border-gray-700 dark:bg-gray-800"
				}
			>
				<Table.Cell colSpan={3} className="min-w-[33rem]">
					No current bookings.
				</Table.Cell>
				<Table.Cell colSpan={2} className="min-w-[24rem]"></Table.Cell>
			</Table.Row>
		</Table>
	);
}

export default UserCurrentTable;
