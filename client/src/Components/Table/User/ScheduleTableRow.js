// Imported libraries
import { setHours } from "date-fns";
import { Table } from "flowbite-react";
import React from "react";

// Imported icons

function ScheduleTableRow(props) {
	const cells = [];

	for (let index = 0; index < 9; index++) {
		const value = props.data.booking[index];
		cells.push(
			<td>
				<div
					className={`border-2 border-gray-400 w-20 h-12 bg-gray-500 ${
						value === 0 &&
						"bg-gray-800 hover:bg-gray-900 hover:border-gray-200"
					} ${value === 2 && "border-green-400 bg-green-400"}
					`}
				>
					<button
						type="button"
						className={`w-full h-full ${value !== 1 && "hidden"}`}
						onClick={() =>
							props.handleBook(
								props.data.name,
								setHours(props.data.date, index + 9)
							)
						}
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
		</Table.Row>
	);
}

export default ScheduleTableRow;
