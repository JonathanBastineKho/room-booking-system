import React from "react";
import SearchCard from "../Components/Search/SearchCard";
import UserCurrentTable from "../Components/Table/UserCurrentTable";
import UserPastTable from "../Components/Table/UserPastTable";
import ScheduleTable from "../Components/Table/ScheduleTable";
import FilterSortAccordion from "../Components/Search/FilterSortAccordion";

function LoginPage() {
	return (
		<div className="flex flex-col justify-center w-full items-center align-middle gap-5">
			LoginPage
			<SearchCard />
			<UserCurrentTable />
			<UserPastTable />
			<ScheduleTable />
			<FilterSortAccordion />
			<div className="h-96"></div>
		</div>
	);
}

export default LoginPage;
