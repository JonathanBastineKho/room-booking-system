// Imported libraries
import { Button, Table } from "flowbite-react";
import React from "react";

// Imported icons
import { FaEdit, FaTrash } from "react-icons/fa";

function UserCurrentTableRow(props) {
	const cancelBooking = (data) => {
		console.log(data)
	}
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{props.data.name}
			</Table.Cell>
			<Table.Cell>{props.data.date}</Table.Cell>
			<Table.Cell>{props.data.time}</Table.Cell>
			<Table.Cell>
				<Button size="xs" className="w-24 py-1">
					<FaEdit className="h-4 w-4 mr-2"/>
					Modify
				</Button>
			</Table.Cell>
			<Table.Cell>
				<Button color="red" size="xs" className="w-24 py-1" onClick={() => cancelBooking(props.data)}>
					<FaTrash className="h-4 w-4 mr-2" />
					Cancel
				</Button>
			</Table.Cell>
		</Table.Row>
	);
}

export default UserCurrentTableRow;
