// Imported Libraries
import {
	Button,
	Label,
	Modal,
	Select,
	TextInput,
	Textarea,
} from "flowbite-react";
import React, { useContext, useState } from "react";
import axios from "axios";

// Imported Local dependencies
import DropImageInput from "./DropImageInput";
import { AuthContext } from "../Authentication/AuthContext";

function StaffModifyRoomModal(props) {
	// {
	// 	name: null,
	// 	type: null,
	// 	price: null,
	// 	capacity: 2,
	// 	description: null,
	// 	file: null,
	// }
	const [data, setData] = useState(props.data);
	const { token } = useContext(AuthContext);

	const handleUpdate = (key, value) => {
		setData((prev) => ({ ...prev, [key]: value }));
	};

	const handleModify = () => {
		if (
			data.name &&
			data.type &&
			data.price &&
			data.capacity &&
			data.description &&
			data.file
		) {
			var formData = new FormData();
			formData.append("roomName", data.name);
			formData.append("roomType", data.type);
			formData.append("price", data.price);
			formData.append("capacity", data.capacity);
			formData.append("file", data.file);
			// axios
			// 	.post("/api/modify-room", formData, {
			// 		headers: {
			// 			Authorization: `Bearer ${token}`,
			// 			"Content-Type": "multipart/form-data",
			// 		},
			// 	})
			// 	.then((res) => {
			// 		if (res.data.success) {
			// 			props.onClose();
			// 		} else {
			// 			alert("Failed to add room.");
			// 		}
			// 	})
			// 	.catch((error) => {
			// 		alert("Failed to add room.");
			// 		console.log(error);
			// 	});
		} else {
			alert("Incomplete data");
		}
	};

	return (
		<Modal show={props.show} size="xl" popup={false} onClose={props.onClose}>
			<div className="bg-gray-800 rounded-lg">
				<Modal.Header>
					<div className="font-bold text-3xl p-2 px-5 pb-0">Add Room</div>
				</Modal.Header>
				<Modal.Body>
					<div className="flex flex-col gap-4 w-full t-3 px-3">
						<div className="flex flex-row justify-between gap-x-2">
							<div className="flex flex-col w-1/2">
								<div className="mb-2">
									<Label htmlFor="room_name" value="Room name" />
								</div>
								<TextInput
									id="room_name"
									placeholder="Enter room name"
									required={true}
									defaultValue={data.name}
									onBlur={(ev) => {
										if (ev.target.value !== data.name) {
											handleUpdate("name", ev.target.value);
										}
									}}
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<div className="mb-2 block">
									<Label htmlFor="room_type" value="Room type" />
								</div>
								<TextInput
									id="room_type"
									placeholder="Enter room type"
									required={true}
									defaultValue={data.type}
									onBlur={(ev) => {
										if (ev.target.value !== data.type) {
											handleUpdate("type", ev.target.value);
										}
									}}
								/>
							</div>
						</div>
						<div className="flex flex-row justify-between gap-x-2">
							<div className="flex flex-col w-1/2">
								<div className="mb-2">
									<Label
										htmlFor="room_price"
										value="Pricing (per hour)"
									/>
								</div>
								<TextInput
									id="room_price"
									placeholder="Enter price"
									required={true}
									defaultValue={data.price}
									onBlur={(ev) => {
										if (ev.target.value !== data.price) {
											handleUpdate("price", ev.target.value);
										}
									}}
								/>
							</div>
							<div className="flex flex-col w-1/2">
								<div className="mb-2 block">
									<Label htmlFor="room_cap" value="Capacity" />
								</div>
								<Select
									id="room_cap"
									required={true}
									onChange={(ev) => {
										handleUpdate("capacity", ev.target.value);
									}}
									value={data.capacity}
								>
									<option value={2}>2</option>
									<option value={5}>5</option>
									<option value={10}>10</option>
									<option value={15}>15</option>
									<option value={20}>20</option>
								</Select>
							</div>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="room_desc" value="Description" />
							</div>
							<Textarea
								id="room_desc"
								placeholder="Enter room description"
								defaultValue={data.description}
								onBlur={(ev) => {
									if (ev.target.value !== data.description) {
										handleUpdate("description", ev.target.value);
									}
								}}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="room_img" value="Room Image" />
							</div>
							<DropImageInput
								file={data.file}
								setFile={(val) => handleUpdate("file", val)}
							/>
						</div>
						<Button
							className="mt-2 rounded-lg"
							size={"lg"}
							onClick={handleModify}
						>
							Modify Room
						</Button>
					</div>
				</Modal.Body>
			</div>
		</Modal>
	);
}

export default StaffModifyRoomModal;
