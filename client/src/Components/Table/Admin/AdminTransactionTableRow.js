// Imported libraries
import { format } from "date-fns";
import { Table } from "flowbite-react";
import React from "react";

function AdminTransactionTableRow(props) {
	const currencyFormat = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{props.data.roomName}
			</Table.Cell>
			<Table.Cell>{props.data.userId}</Table.Cell>
			<Table.Cell>{format(new Date(props.data.startTime), "d MMMM yyyy")}</Table.Cell>
			<Table.Cell>{`${format(new Date(props.data.startTime), "h:00aaa")} - ${format(
				new Date(props.data.endTime),
				"h:00aaa"
			)}`}</Table.Cell>
			<Table.Cell>{currencyFormat.format(props.data.bookingPrice)}</Table.Cell>
		</Table.Row>
	);
}

export default AdminTransactionTableRow;
