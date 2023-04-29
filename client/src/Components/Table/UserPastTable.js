// Imported Libraries
import { Table } from "flowbite-react";
import React from "react";

// Imported local dependencies
import UserPastTableRow from "./UserPastTableRow";

function UserPastTable(props) {
	const data = [
		{
			name: "Room 1",
			date: "10 May 2023",
			time: "10:00 am - 01:00 pm",
			duration: 3,
			fee: "$20",
		},
		{
			name: "Room 2",
			date: "9 May 2023",
			time: "10:00 am - 01:00 pm",
			duration: 3,
			fee: "$20",
		},
		{
			name: "Room 3",
			date: "8 May 2023",
			time: "10:00 am - 01:00 pm",
			duration: 3,
			fee: "$20",
		},
	];
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
				{data.map((value) => (
					<UserPastTableRow data={value} />
				))}
			</Table.Body>
		</Table>
	);
}

export default UserPastTable;
