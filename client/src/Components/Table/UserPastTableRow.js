// Imported libraries
import { Button, Table } from "flowbite-react";
import React from "react";


function UserPastTableRow(props) {
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{props.data.name}
			</Table.Cell>
			<Table.Cell>{props.data.date}</Table.Cell>
			<Table.Cell>{props.data.time}</Table.Cell>
			<Table.Cell className="w-36">{props.data.duration} hours</Table.Cell>
			<Table.Cell className="w-36">{props.data.fee}</Table.Cell>
		</Table.Row>
	);
}

export default UserPastTableRow;
