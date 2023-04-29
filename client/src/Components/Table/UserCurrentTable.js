// Imported Libraries
import { Table } from "flowbite-react";
import React from "react";

// Imported local dependencies
import UserCurrentTableRow from "./UserCurrentTableRow";

function UserCurrentTable(props) {
	const data = [
		{ name: "Room 1", date: "10 May 2023", time: "10:00 am - 01:00 pm" },
		{ name: "Room 2", date: "9 May 2023", time: "10:00 am - 01:00 pm" },
		{ name: "Room 3", date: "8 May 2023", time: "10:00 am - 01:00 pm" },
	];
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
					<UserCurrentTableRow data={value} />
				))}
			</Table.Body>
		</Table>
	);
}

export default UserCurrentTable;
