// Imported libraries
import { setHours } from "date-fns";
import { Table } from "flowbite-react";
import React, { useState } from "react";
import RoomModal from "../../Rooms/RoomModal";

// Imported icons

function ScheduleTableRow(props) {
	const [modalShow, setModalShow] = useState(false);

	const cells = [];
	for (let index = 0; index < 9; index++) {
		const value = props.data.bookings[index];
		cells.push(
			<td key={index}>
				<div
					className={`border-2 border-gray-400 w-20 h-12 bg-gray-500 ${
						value === 0 &&
						"bg-gray-800 hover:bg-gray-900 hover:border-gray-200"
					} ${value === 2 && "border-green-400 bg-green-400"}
					`}
				>
					<button
						type="button"
						className={`w-full h-full ${value !== 0 && "hidden"}`}
						onClick={() => setModalShow(true)}
					/>
				</div>
			</td>
		);
	}
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				<div className="mx-5">{props.data.name}</div>
			</Table.Cell>
			{cells}
			<Table.Cell></Table.Cell>
			<RoomModal
				roomJson={{
					capacity: 10,
					description: "new description",
					name: props.data.name,
					price: 20,
					roomType: "Lecture Hall",
					// capacity: props.data.capacity,
					// description: props.data.description,
					// name: props.data.name,
					// price: props.data.price,
					// roomType: props.data.type,
				}}
				show={modalShow}
				imageUrl={`http://127.0.0.1:5000/api/get_room_image?roomName=${props.data.name}`}
				onClose={() => setModalShow(false)}
				date={props.date}
			/>
		</Table.Row>
	);
}

export default ScheduleTableRow;
