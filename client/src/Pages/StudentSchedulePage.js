import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Authentication/AuthContext";
import axios from "axios";
import { format } from "date-fns";
import ScheduleTable from "../Components/Table/User/ScheduleTable";
import DatePicker from "../Components/Search/DatePicker.js";
import SortAccordion from "../Components/Search/SortAccordion";
import FilterSortAccordion from "../Components/Search/FilterSortAccordion";
import { TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";

function StudentSchedulePage() {
	const [date, setDate] = useState({ date: new Date() });
	const [search, setSearch] = useState("");
	const [schedule, setSchedule] = useState([]);
	const { token } = useContext(AuthContext);
	// const [sortBy, setSortBy] = useState({
	// 	by: "name",
	// 	ascending: true,
	// });
	// const [roomType, setRoomType] = useState("Showing All");
	// const [price, setPrice] = useState({
	// 	min: 0,
	// 	max: 100,
	// });
	// const [capacity, setCapacity] = useState({
	// 	min: 0,
	// 	max: 20,
	// });

	useEffect(() => {
		getSchedule();
	}, [date]);

	const filter = (name) => {
		if (search === "") {
			return true;
		}
		if (name.toLowerCase().includes(search)) {
			return true;
		}
		return false;
	};

	const getSchedule = () => {
		if (token) {
			axios
				.get(
					`/api/room_details?dateTime=${format(date.date, "yyyy-MM-dd")}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				.then((res) => {
					setSchedule(res.data.rooms);
					console.log(token);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	console.log(schedule);

	return (
		<div className="flex flex-col w-full justify-center items-center align-middle">
			<div className="flex flex-row mt-5 w-11/12 max-w-[61rem] justify-between align-middle gap-2">
				<DatePicker
					data={date}
					setData={setDate}
					update_key="date"
					min_date={new Date()}
					className="w-[15rem]"
				/>
				<TextInput
					id="name"
					type="text"
					icon={AiOutlineSearch}
					placeholder="Search by room name"
					required={true}
					onChange={(ev) => setSearch(ev.target.value)}
					className="w-[20rem]"
				/>
			</div>
			<div className="flex flex-wrap gap-x-5 gap-y-2 justify-start w-11/12 max-w-[61rem] mt-3">
				<div className=" flex flex-row text-white font-semibold gap-3">
					<div className="w-[5rem] bg-gray-800 h-full border border-gray-500">
						&nbsp;
					</div>
					Available Slot
				</div>
				<div className=" flex flex-row text-white font-semibold gap-3">
					<div className="w-[5rem] bg-gray-500 h-full border border-gray-500">
						&nbsp;
					</div>
					Booked Slot
				</div>
				<div className=" flex flex-row text-white font-semibold gap-3">
					<div className="w-[5rem] bg-green-300 h-full border border-green-400">
						&nbsp;
					</div>
					Your Booking
				</div>
			</div>
			<div className="w-11/12 max-w-[62.3rem] overflow-x-scroll mx-5 mt-3">
				<ScheduleTable
					date={date.date}
					schedule={schedule}
					filter={filter}
				/>
			</div>
		</div>
	);
}

export default StudentSchedulePage;
