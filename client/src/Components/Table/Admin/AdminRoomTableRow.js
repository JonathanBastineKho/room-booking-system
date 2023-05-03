// Imported libraries
import { format } from "date-fns";
import { Button, Table } from "flowbite-react";
import React from "react";

// Imported icons
import { MdOutlineApproval } from "react-icons/md";

function AdminRoomTableRow(props) {
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
				<p className="w-80 max-h-16 overflow-y-auto">
					{props.data.description}
				</p>
			</Table.Cell>
			<Table.Cell>
				{props.data.approved.is ? "Approved" : "Pending Approval"}
			</Table.Cell>
			<Table.Cell>
				{props.data.approved.is ? (
					"Approved at " + format(props.data.approved.date, "d MMMM yyyy")
				) : (
					<Button
						size="xs"
						className="w-40 py-1"
						onClick={() => props.approveRoom(props.data.name)}
					>
						<MdOutlineApproval className="h-4 w-4 mr-2" />
						Approve
					</Button>
				)}
			</Table.Cell>
		</Table.Row>
	);
}

export default AdminRoomTableRow;
