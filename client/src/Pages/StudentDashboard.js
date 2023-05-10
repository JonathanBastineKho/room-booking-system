// Imported libraries
import React, { useContext } from "react";

// Imported local dependencies
import { AuthContext } from "../Components/Authentication/AuthContext";
import SearchCard from "../Components/Search/SearchCard";
import UserCurrentTable from "../Components/Table/User/UserCurrentTable";

function StudentDashboard() {
	const { token } = useContext(AuthContext);

	return (
		<div className="flex flex-col items-center">
			<div className="w-full bg-sky-400 p-20 px-5 md:px-20">
				<SearchCard className="md:w-160" />
			</div>
			<div className="m-5 md:m-10 mt-10 overflow-x-auto">
				<UserCurrentTable />
			</div>
		</div>
	);
}

export default StudentDashboard;
