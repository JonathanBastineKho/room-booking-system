// Imported Libraries
import { Table } from "flowbite-react";
import React from "react";

// Imported local dependencies
import { setHours } from "date-fns";
import AdminTransactionTableRow from "./AdminTransactionTableRow";

function AdminTransactionTable(props) {
	// Dummy data -> change with props.data which will be extracted from API.
	const data = [
		{
			room: "Room 1",
			user: "edbertekaputera",
			start: setHours(new Date(), 9),
			end: setHours(new Date(), 10),
			fee: 20,
		},
		{
			room: "Room 2",
			user: "edbertekaputera",
			start: setHours(new Date(), 12),
			end: setHours(new Date(), 13),
			fee: 20,
		},
		{
			room: "Room 3",
			user: "jojotinggi",
			start: setHours(new Date(), 15),
			end: setHours(new Date(), 17),
			fee: 40,
		},
	];

	return (
		<Table hoverable={props.hoverable}>
			<Table.Head>
				<Table.HeadCell>Room name</Table.HeadCell>
				<Table.HeadCell>User</Table.HeadCell>
				<Table.HeadCell>Booking Date</Table.HeadCell>
				<Table.HeadCell>Booking Time</Table.HeadCell>
				<Table.HeadCell>Fee</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y">
				{data.map((value) => (
					<AdminTransactionTableRow data={value} />
				))}
			</Table.Body>
		</Table>
	);
}

export default AdminTransactionTable;
