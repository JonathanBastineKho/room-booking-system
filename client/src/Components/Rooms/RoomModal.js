import { Modal, Button, Select } from "flowbite-react";
import React, { useState, useEffect, useContext } from "react";
import DatePicker from "../Search/DatePicker";
import { format, setHours } from "date-fns";
import { DateContext } from "../../Pages/SearchResultPage";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

function RoomModal(props) {
	const { token } = useContext(AuthContext);
	const [timeSlots, setTimeSlots] = useState([]);
	const [data, setData] = useState({
		// default value is date passed from parent
		date: props.date,
		startTime: 0,
		endTime: 0,
	});

	const handleUpdate = (key, value) => {
		setData((prev) => ({ ...prev, [key]: value }));
	};

	const setNewStartTime = (ev) => {
		handleUpdate("startTime", ev.currentTarget.value);
		handleUpdate("endTime", ev.currentTarget.value);
	};
	// do getRoomJson and getTimeSlots again
	// watch when booking date changes
	useEffect(() => {
		getTimeSlots();
	}, [data.date]);

	useEffect(() => {
		handleUpdate("date", props.date);
	}, [props.date]);

	// API CALL
	const getTimeSlots = () => {
		if (token) {
			axios
				.get(
					`/api/room_schedule?roomName=${
						props.roomJson.name
					}&date=${format(data.date, "yyyy-MM-dd")}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				.then((res) => {
					if (res.data.success) {
						setTimeSlots(res.data.slot);
					} else {
						alert("An error occured please refresh the page.");
						setTimeSlots([1, 1, 1, 1, 1, 1, 1, 1, 1]);
						console.log("ERROR");
					}
				})
				.catch((error) => {
					alert("An error occured please refresh the page.");
					setTimeSlots([1, 1, 1, 1, 1, 1, 1, 1, 1]);
					console.log(error);
				});
		}
	};

	// var timeSlots = getTimeSlots("my roomName", new Date());
	var endSlots = [];
	let endFlag = false;
	// start time range is 0-9, endtime range is 1-10,
	for (let index = 0; index < 9; index++) {
		if (index < data.startTime || endFlag) {
			endSlots.push(1);
		} else if (timeSlots[index] === 1 || timeSlots[index] === 2) {
			endSlots.push(1);
			endFlag = true;
		} else {
			endSlots.push(0);
		}
	}

	return (
		<Modal
			show={props.show}
			size="lg"
			onClose={props.onClose}
			popup={true}
			dismissible={true}
		>
			<div className="bg-gray-800 rounded-lg">
				<Modal.Header />
				<Modal.Body>
					<img
						src={props.imageUrl}
						alt={props.roomJson.name}
						className="mb-2 rounded-lg"
					/>
					<div className="text-left p-4">
						<div className="mb-4">
							<h5 className="text-3xl font-bold tracking-tight text-white">
								{props.roomJson.name}
							</h5>
							<h3 className="mb-5 text-sm font-bold text-gray-400 dark:text-gray-400">
								{props.roomJson.description}
							</h3>
							<p className="font-normal text-gray-400 text-sm">
								Type: {props.roomJson.roomType}
								<br />
								Capacity: {props.roomJson.capacity} pax
								<br />
								Pricing: ${props.roomJson.price}/hour
							</p>
						</div>

						<div className="mb-5">
							<div className="flex items-center font-normal text-white text-md mb-3">
								<div className="mr-5 w-36">
									<p>Booking date:</p>
								</div>
								<DatePicker
									id="date"
									data={data}
									setData={setData}
									update_key="date"
									min_date={new Date()}
									className="w-full"
								/>
							</div>
							<div className="flex items-center font-normal text-white text-md justify-between">
								<div className="flex flex-row">
									<div className="flex mr-5 items-center">
										Start time:
									</div>
									<Select
										value={data.startTime}
										id="startTime"
										required={true}
										onChange={(event) => setNewStartTime(event)}
									>
										{timeSlots.map((slot, index) => {
											var time = index + 9;
											// convert list to readable time slots (09:00)
											// var timeString = time < 10 ? `0${time}:00` : `${time}:00`;
											var timeString = format(
												setHours(new Date(), time),
												"h:00aaa"
											);
											return (
												<option
													key={index}
													value={index}
													disabled={slot === 1 || slot === 2}
												>
													{timeString}
												</option>
											);
										})}
										;
									</Select>
								</div>
								<div className="flex flex-row">
									<div className="flex items-center mr-3">
										<p>End time: </p>
									</div>
									<div className="flex items-center">
										<Select
											value={data.endTime}
											id="endTime"
											required={true}
											onChange={(event) =>
												handleUpdate("endTime", event.target.value)
											}
										>
											{endSlots.map((slot, index) => {
												var time = index + 10;
												// convert list to readable time slots (09:00)
												// var timeString = time < 10 ? `0${time}:00` : `${time}:00`;
												var timeString = format(
													setHours(new Date(), time),
													"h:00aaa"
												);
												return (
													<option
														key={index}
														value={index}
														disabled={
															slot === 1 ||
															time <= data.startTime
														}
													>
														{timeString}
													</option>
												);
											})}
											;
										</Select>
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-center gap-4">
							<Link
								to={`/checkout?roomName=${
									props.roomJson.name
								}&date=${format(data.date, "yyyy-MM-dd")}
								&startTime=${data.startTime}
								&endTime=${data.endTime}`}
							>
								<Button className="w-full">Book now</Button>
							</Link>
						</div>
					</div>
				</Modal.Body>
			</div>
		</Modal>
	);
}

export default RoomModal;
