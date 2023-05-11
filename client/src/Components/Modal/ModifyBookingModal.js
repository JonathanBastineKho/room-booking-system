// Imported libraries
import { format, getHours, setHours } from "date-fns";
import { Button, Label, Modal, Select } from "flowbite-react";
import React, { useState } from "react";

// Imported icons

// Imported local dependencies
import DatePicker from "../Search/DatePicker";

function ModifyBookingModal(props) {
	const [data, setData] = useState({
		date: props.start,
		startTime: getHours(props.start),
		endTime: getHours(props.end),
	});

	const handleUpdate = (key, value) => {
		setData((prev) => ({ ...prev, [key]: value }));
	};

	const endTimeSlots = [];
	for (let index = 10; index < 19; index++) {
		const time = format(setHours(new Date(), index), "h:00aaa");
		endTimeSlots.push(
			<option
				value={index}
				disabled={
					index <= data.startTime ||
					index - data.startTime >
						getHours(props.end) - getHours(props.start)
				}
			>
				{time}
			</option>
		);
	}
	return (
		<Modal
			show={props.modifyShow}
			size="xl"
			popup={false}
			onClose={() => props.setModifyShow(false)}
		>
			<div className="bg-gray-800 rounded-lg">
				<Modal.Header>
					<div className="font-bold text-3xl p-2 px-5 pb-0">
						Modify Booking
					</div>
				</Modal.Header>
				<Modal.Body>
					<div className="flex flex-col gap-4 w-full t-3 px-3">
						<div className="flex flex-row justify-between gap-x-2">
							<div className="flex flex-col w-full">
								<div className="mb-2">
									<Label htmlFor="date" value="Start date" />
								</div>
								<DatePicker
									id="date"
									data={data}
									setData={setData}
									update_key="date"
									min_date={new Date()}
									className=""
								/>
							</div>
						</div>
						<div className="flex flex-row justify-between gap-x-2">
							<div className="flex flex-col w-1/2">
								<div className="mb-2 block">
									<Label htmlFor="starttime" value="Start time" />
								</div>
								<Select
									id="starttime"
									required={true}
									onChange={(ev) => {
										handleUpdate("startTime", ev.target.value);
										handleUpdate("endTime", parseInt(ev.target.value) + 1);
									}}
									value={data.startTime}
								>
									<option value={9}>9:00am</option>
									<option value={10}>10:00am</option>
									<option value={11}>11:00am</option>
									<option value={12}>12:00pm</option>
									<option value={13}>1:00pm</option>
									<option value={14}>2:00pm</option>
									<option value={15}>3:00pm</option>
									<option value={16}>4:00pm</option>
									<option value={17}>5:00pm</option>
								</Select>
							</div>
							<div className="flex flex-col w-1/2">
								<div className="mb-2 block">
									<Label htmlFor="endtime" value="End time" />
								</div>
								<Select
									id="endtime"
									required={true}
									onChange={(ev) => {
										handleUpdate("endTime", ev.target.value);
									}}
									value={data.endTime}
								>
									{endTimeSlots}
								</Select>
							</div>
						</div>
						<Button
							className="mt-2 rounded-lg"
							size={"lg"}
							onClick={() => {
								props.modifyBooking(
									props.name,
									props.start,
									setHours(data.date, data.startTime),
									setHours(data.date, data.endTime)
								);
								console.log(
									props.name,
									props.start,
									setHours(data.date, data.startTime),
									setHours(data.date, data.endTime)
								);
								props.setModifyShow(false);
							}}
						>
							Modify Booking
						</Button>
					</div>
					<div>
						{format(data.date, "yyyy-MM-dd HH")}
						{format(setHours(data.date, data.startTime), "yyyy-MM-dd HH")}
						{format(setHours(data.date, data.endTime), "yyyy-MM-dd HH")}
					</div>
				</Modal.Body>
			</div>
		</Modal>
	);
}

export default ModifyBookingModal;
