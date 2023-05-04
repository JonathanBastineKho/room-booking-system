// Imported libraries
import { format } from "date-fns";
import { Button, Table } from "flowbite-react";
import React from "react";

// Imported icons
import { FaEdit, FaTrash } from "react-icons/fa";

function StaffPromoTableRow(props) {
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{props.data.promoCode}
			</Table.Cell>
			<Table.Cell>{format(props.data.startDate, "d MMMM yyyy, h:00aaa")}</Table.Cell>
			<Table.Cell>{format(props.data.endDate, "d MMMM yyyy, h:00aaa")}</Table.Cell>
			<Table.Cell>{`${props.data.discount}%`}</Table.Cell>
			<Table.Cell>
				<Button
					size="xs"
					className="w-24 py-1"
					onClick={() =>
						props.editPromo(props.data.promoCode, props.data.startDate)
					}
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
					onClick={() =>
						props.deletePromo(props.data.promoCode, props.data.startDate)
					}
				>
					<FaTrash className="h-4 w-4 mr-2" />
					Delete
				</Button>
			</Table.Cell>
		</Table.Row>
	);
}

export default StaffPromoTableRow;
