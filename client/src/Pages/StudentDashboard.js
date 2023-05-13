// Imported libraries
import React, { useContext } from "react";

// Imported local dependencies
import { AuthContext } from "../Components/Authentication/AuthContext";
import SearchCard from "../Components/Search/SearchCard";
import UserCurrentTable from "../Components/Table/User/UserCurrentTable";
import UserPastTable from "../Components/Table/User/UserPastTable";

function StudentDashboard() {
	const { token } = useContext(AuthContext);

	return (
		<div className="flex flex-col items-center">
			<div className="w-full bg-sky-400 p-20 px-5 md:px-20">
				<SearchCard className="md:w-160" />
			</div>
			<div
				id="current_booking"
				className="flex flex-col m-5 md:m-10 mt-10 overflow-x-auto"
			>
				<span className="text-white text-4xl font-bold mb-5">
					Your Current Bookings
				</span>
				<UserCurrentTable />
			</div>
			<div id="past_booking" className="flex flex-col m-5 md:m-10 mt-10 overflow-x-auto">
				<span className="text-white text-4xl font-bold mb-5">
					Your Past Bookings
				</span>

				<UserPastTable />
			</div>
		</div>
	);
}

export default StudentDashboard;
