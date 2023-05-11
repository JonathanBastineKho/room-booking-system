// Imported libraries
import { format } from "date-fns";
import { Button, Modal, Table } from "flowbite-react";
import React, { useState } from "react";

// Imported icons
import { FaEdit, FaTrash } from "react-icons/fa";
import CancelBookingModal from "../../Modal/CancelBookingModal";
import ModifyBookingModal from "../../Modal/ModifyBookingModal";

function UserCurrentTableRow(props) {
	const [cancelShow, setCancelShow] = useState(false);
	const [modifyShow, setModifyShow] = useState(false);
	
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="w-[12rem] whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{props.data.name}
			</Table.Cell>
			<Table.Cell className="w-[12rem]">
				{format(props.data.start, "d MMMM yyyy")}
			</Table.Cell>
			<Table.Cell className="w-[12rem]">{`${format(
				props.data.start,
				"h:00aaa"
			)} - ${format(props.data.end, "h:00aaa")}`}</Table.Cell>
			<Table.Cell className="w-[10rem] px-2">
				<div className="flex flex-row items-center align-middle w-24">
					<Button
						size="xs"
						className="w-24 py-1"
						onClick={() =>
							setModifyShow(true)
						}
					>
						<FaEdit className="h-4 w-4 mr-2" />
						Modify
					</Button>
				</div>
			</Table.Cell>
			<Table.Cell className="w-[10rem] px-2">
				<div className="flex flex-row items-center align-middle w-24">
					<Button
						color="red"
						size="xs"
						className="w-24 py-1"
						onClick={() => setCancelShow(true)}
					>
						<FaTrash className="h-4 w-4 mr-2" />
						Cancel
					</Button>
				</div>
			</Table.Cell>
			<CancelBookingModal
				cancelShow={cancelShow}
				setCancelShow={setCancelShow}
				name={props.data.name}
				start={props.data.start}
				cancelBooking={props.cancelBooking}
			/>
			<ModifyBookingModal 
				modifyShow={modifyShow}
				setModifyShow={setModifyShow}
				name={props.data.name}
				end={props.data.end}
				start={props.data.start}
				modifyBooking={props.modifyBooking}
			/>
			

		</Table.Row>
	);
}

export default UserCurrentTableRow;
