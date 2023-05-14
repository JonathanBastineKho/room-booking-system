// Imported Libraries
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import axios from "axios";

// Imported Local dependencies
import { AuthContext } from "../Authentication/AuthContext";
import DatePicker from "../Search/DatePicker";
import { format, isSameDay, setHours } from "date-fns";
import StaffModifyPromoForm from "../Forms/StaffModifyPromoForm";

function StaffModifyPromoModal(props) {
	// {
	// 	code: null,
	// 	startDate: new Date(),
	// 	startTime: null,
	// 	endDate: new Date(),
	// 	endTime: null,
	// 	discount: 2,
	// }
	const [data, setData] = useState(props.data);
	const { token } = useContext(AuthContext);

	const endTimeSlots = [];
	for (let index = 10; index < 19; index++) {
		const time = format(setHours(new Date(), index), "h:00aaa");
		endTimeSlots.push(
			<option
				value={index}
				disabled={
					isSameDay(data.startDate, data.endDate)
						? index <= data.startTime
						: false
				}
			>
				{time}
			</option>
		);
	}

	const handleUpdate = (key, value) => {
		setData((prev) => ({ ...prev, [key]: value }));
	};
	const handleModify = () => {
		if (
			data.code &&
			data.startDate &&
			data.startTime &&
			data.endDate &&
			data.endTime &&
			data.discount
		) {
			// var formData = new FormData();
			// formData.append("code", data.name);
			// formData.append(
			// 	"start",
			// 	format(setHours(data.startDate, data.startTime), "yyyy-MM-dd HH")
			// );
			// formData.append(
			// 	"end",
			// 	format(setHours(data.endDate, data.endTime), "yyyy-MM-dd HH")
			// );
			// formData.append("discount", data.capacity);
			// axios
			// 	.post("/api/create_room", formData, {
			// 		headers: {
			// 			Authorization: `Bearer ${token}`,
			// 			"Content-Type": "multipart/form-data",
			// 		},
			// 	})
			// 	.then((res) => {
			// 		if (res.data.success) {
			// 			props.onClose();
			// 		} else {
			// 			alert("Failed to add promo code.");
			// 		}
			// 	})
			// 	.catch((error) => {
			// 		alert("Failed to add promo code.");
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
					<div className="font-bold text-3xl p-2 px-5 pb-0">
						Add Promo Code
					</div>
				</Modal.Header>
				<Modal.Body>
					<StaffModifyPromoForm data={data} onClose={props.onClose} />
				</Modal.Body>
			</div>
		</Modal>
	);
}

export default StaffModifyPromoModal;
