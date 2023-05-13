// Imported libraries
import { format } from "date-fns";
import { Button, Table } from "flowbite-react";
import React, { useContext, useState } from "react";
import axios from "axios";

// Imported icons
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";
import StaffModifyRoomModal from "../../Modal/StaffModifyRoomModal";
import DeleteRoomModal from "./DeleteRoomModal";
import { AuthContext } from "../../Authentication/AuthContext";

function StaffRoomTableRow(props) {
	const { token } = useContext(AuthContext);
	const [modifyShow, setModifyShow] = useState(false);
	const [deleteShow, setDeleteShow] = useState(false);

	const currencyFormat = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	// NOTE TO SELF
	// TODO: ADD ROOM, MODIFY

	const deleteRoom = (name, token) => {
		console.log("delete room function")
		console.log("delete", name);
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: {
				roomName: name
			}
		};

		axios.delete("/api/delete_room", config)
			.then((res) => {
				setDeleteShow(false);
				props.getRooms();
			})
			.catch((err) => {
				console.log(err);
			})
	  };


	const launchRoom = (name, token) => {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		};
		const data = {
			roomName: name
		}

		axios.patch("/api/launch_room", data, config)
			.then((res) => {
				console.log(res.data);
				props.getRooms();
			})
			.catch((err) => {
				console.log(err);
			})
	}

	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{props.data.name}
			</Table.Cell>
			<Table.Cell>{props.data.type}</Table.Cell>
			<Table.Cell>{currencyFormat.format(props.data.price)}</Table.Cell>
			<Table.Cell>{props.data.capacity + " pax"}</Table.Cell>
			<Table.Cell>
				<p className="w-80 max-h-16 overflow-y-auto">
					{props.data.description}
				</p>
			</Table.Cell>
			<Table.Cell>
				{props.data.launched.is ? (
					"Launched at " + format(props.data.launched.date, "d MMMM yyyy")
				) : (
					<Button
						size="xs"
						className="w-40 py-1"
						onClick={() => launchRoom(props.data.name, token)}
					>
						<MdOutlineRocketLaunch className="h-4 w-4 mr-2" />
						Launch
					</Button>
				)}
			</Table.Cell>
			<Table.Cell>
				<Button
					size="xs"
					className="w-24 py-1"
					onClick={() => setModifyShow(true)}
					disabled={props.data.launched.is}
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
					onClick={() => setDeleteShow(true)}
				>
					<FaTrash className="h-4 w-4 mr-2" />
					Delete
				</Button>
			</Table.Cell>
			<StaffModifyRoomModal
				show={modifyShow}
				onClose={() => setModifyShow(false)}
				data={props.data}
			/>
			<DeleteRoomModal
				show={deleteShow}
				onClose={() => setDeleteShow(false)}
				deleteRoom={deleteRoom}
				data={props.data}
			/>

		</Table.Row>
	);
}

export default StaffRoomTableRow;
