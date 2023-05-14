// Imported Libraries
import { Table } from "flowbite-react";
import React from "react";

// Imported local dependencies
import ScheduleTableRow from "./ScheduleTableRow";
import { format } from "date-fns";

function ScheduleTable(props) {
	// Dummy handleBook -> Change with props.handleBook which would open Modal
	const handleBook = (name, date) => {
		alert(`${name} and ${format(date, "d/MM/yyyy H")}`);
	};

	let counter = 0;

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
				{props.schedule.map((value) => {
					if (props.filter(value.roomName)) {
						counter++;
						return (
							<ScheduleTableRow
								key={value.name}
								data={{
									name: value.roomName,
									price: value.price,
									description: value.roomDescription,
									roomType: value.roomType,
									bookings: value.bookingSlots,
									capacity: 10
								}}
								date={props.date}
								handleBook={handleBook}
							/>
						);
					}
				})}
				<Table.Row
					className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${
						counter > 0 && "hidden"
					}`}
				>
					<Table.Cell className="text-center" colSpan={10}>
						No rooms found.
					</Table.Cell>
					<Table.Cell></Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	);
}

export default ScheduleTable;
