// Imported Libraries
import { Table } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { setHours, setMonth } from "date-fns";

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
	const { token, logout} = useContext(AuthContext);
	const { data, setData } = useState([]);
	
	useEffect(() => {
		axios.get("/api/current_bookings", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				setData(res.data.bookings);
				console.log(res.data.bookings);
			})
			.catch((error) => {
				console.log(error);
				logout();
			});
	}, []);
	// Dummy cancel -> change with props.cancelBooking with MODAL AND API
	const cancelBooking = (name, start) => {
		console.log("CANCEL", name, start);
	};

	// Dummy modify -> change with props.modifyBooking to open MODAL AND API
	const modifyBooking = (name, start) => {
		console.log("MODIFY", name, start);
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
				{data.map((value) => (
					<UserCurrentTableRow
						data={value}
						cancelBooking={cancelBooking}
						modifyBooking={modifyBooking}
					/>
				))}
			</Table.Body>
		</Table>
	);
}

export default UserCurrentTable;
