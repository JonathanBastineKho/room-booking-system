// Imported Libraries
import { Table } from "flowbite-react";
import React from "react";

// Imported local dependencies
import ScheduleTableRow from "./ScheduleTableRow";
import { format } from "date-fns";

function ScheduleTable(props) {
	// Dummy data -> change with props.data which will be extracted from API.
	const data = [
		{
			name: "Room 1",
			date: new Date(),
			booking: [0, 1, 1, 0, 1, 2, 2, 1, 0],
		},
		{
			name: "Room 2",
			date: new Date(),
			booking: [0, 0, 0, 0, 1, 2, 2, 1, 0],
		},
		{
			name: "Room 3",
			date: new Date(),
			booking: [0, 1, 0, 0, 0, 2, 2, 1, 1],
		},
		{
			name: "Room 4",
			date: new Date(),
			booking: [2, 0, 1, 1, 1, 1, 1, 1, 1],
		},
	];

	// Dummy handleBook -> Change with props.handleBook which would open Modal
	const handleBook = (name, date) => {
		alert(`${name} and ${format(date, "d/MM/yyyy H")}`);
	};

	return (
		<Table hoverable={props.hoverable} cellPadding="0">
			<Table.Head>
				<Table.HeadCell>
					<div className="mx-5">Room Name</div>
				</Table.HeadCell>
				<th className="bg-gray-700">
					<div className="justify-start text-start w-20 ">9am</div>
				</th>
				<th className="bg-gray-700">
					<div className="justify-start text-start w-20 ">10am</div>
				</th>
				<th className="bg-gray-700">
					<div className="justify-start text-start w-20 ">11am</div>
				</th>
				<th className="bg-gray-700">
					<div className="justify-start text-start w-20 ">12pm</div>
				</th>
				<th className="bg-gray-700">
					<div className="justify-start text-start w-20 ">1pm</div>
				</th>
				<th className="bg-gray-700">
					<div className="justify-start text-start w-20 ">2pm</div>
				</th>
				<th className="bg-gray-700">
					<div className="justify-start text-start w-20 ">3pm</div>
				</th>
				<th className="bg-gray-700">
					<div className="justify-start text-start w-20 ">4pm</div>
				</th>
				<th className="bg-gray-700">
					<div className="justify-start text-start w-20 ">5pm</div>
				</th>
				<th className="bg-gray-700 rounded-tr-lg">
					<div className="justify-start text-start w-20 ">6pm</div>
				</th>
			</Table.Head>
			<Table.Body className="divide-y">
				{data.map((value) => (
					<ScheduleTableRow data={value} handleBook={handleBook} />
				))}
			</Table.Body>
		</Table>
	);
}

export default ScheduleTable;
