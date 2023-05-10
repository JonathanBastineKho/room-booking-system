// Imported libraries
import { format } from "date-fns";
import { Button, Table } from "flowbite-react";
import React from "react";

// Imported icons
import { FaEdit, FaTrash } from "react-icons/fa";

function UserCurrentTableRow(props) {
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="min-w-[10rem] whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{props.data.name}
			</Table.Cell>
			<Table.Cell className="min-w-[12rem]">
				{format(props.data.start, "d MMMM yyyy")}
			</Table.Cell>
			<Table.Cell className="min-w-[11rem]">{`${format(
				props.data.start,
				"h:00aaa"
			)} - ${format(props.data.end, "h:00aaa")}`}</Table.Cell>
			<Table.Cell className="w-[12rem] px-2">
				<div className="flex flex-row items-center align-middle">
					<Button
						size="xs"
						className="w-24 py-1"
						onClick={() =>
							props.modifyBooking(props.data.name, props.data.start)
						}
					>
						<FaEdit className="h-4 w-4 mr-2" />
						Modify
					</Button>
				</div>
			</Table.Cell>
			<Table.Cell className="w-[12rem] px-2">
				<div className="flex flex-row items-center align-middle">
					<Button
						color="red"
						size="xs"
						className="w-24 py-1"
						onClick={() =>
							props.cancelBooking(props.data.name, props.data.start)
						}
					>
						<FaTrash className="h-4 w-4 mr-2" />
						Cancel
					</Button>
				</div>
			</Table.Cell>
		</Table.Row>
	);
}

export default UserCurrentTableRow;
