// Imported libraries
import { format, getHours } from "date-fns";
import { Table } from "flowbite-react";
import React from "react";

function UserPastTableRow(props) {
	const currencyFormat = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{props.data.name}
			</Table.Cell>
			<Table.Cell>{format(props.data.start, "d MMMM yyyy")}</Table.Cell>
			<Table.Cell>{`${format(props.data.start, "h:00aaa")} - ${format(
				props.data.end,
				"h:00aaa"
			)}`}</Table.Cell>
			<Table.Cell className="w-36">
				{getHours(props.data.end) - getHours(props.data.start)} hours
			</Table.Cell>
			<Table.Cell className="w-36">{currencyFormat.format(props.data.fee)}</Table.Cell>
		</Table.Row>
	);
}

export default UserPastTableRow;
