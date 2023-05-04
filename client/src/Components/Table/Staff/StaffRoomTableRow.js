// Imported libraries
import { format } from "date-fns";
import { Button, Table } from "flowbite-react";
import React from "react";

// Imported icons
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";

function StaffRoomTableRow(props) {
	const currencyFormat = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{props.data.name}
			</Table.Cell>
			<Table.Cell>{props.data.type}</Table.Cell>
			<Table.Cell>{currencyFormat.format(props.data.price)}</Table.Cell>
			<Table.Cell>
				<p className="w-80 max-h-16 overflow-y-auto">{props.data.description}</p>
			</Table.Cell>
			<Table.Cell>
				{props.data.launched.is ? (
					"Launched at " + format(props.data.launched.date, "d MMMM yyyy")
				) : (
					<Button
						size="xs"
						className="w-40 py-1"
						onClick={() => props.launchRoom(props.data.name)}
					>
						<MdOutlineRocketLaunch className="h-4 w-4 mr-2" />
						Launched
					</Button>
				)}
			</Table.Cell>
			<Table.Cell>
				<Button
					size="xs"
					className="w-24 py-1"
					onClick={() => props.editRoom(props.data.name)}
				>
					<FaEdit className="h-4 w-4 mr-2" />
					Edit
				</Button>
			</Table.Cell>
			<Table.Cell>
				<Button
					color="red"
					size="xs"
					className="w-24 py-1"
					onClick={() => props.deleteRoom(props.data.name)}
				>
					<FaTrash className="h-4 w-4 mr-2" />
					Delete
				</Button>
			</Table.Cell>
		</Table.Row>
	);
}

export default StaffRoomTableRow;
