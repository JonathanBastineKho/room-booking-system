import React from "react";
import SearchCard from "../Components/Search/SearchCard";
import UserCurrentTable from "../Components/Table/User/UserCurrentTable";
import FilterSortAccordion from "../Components/Search/FilterSortAccordion";
import StaffPromoTable from "../Components/Table/Staff/StaffPromoTable";
import AdminRoomTable from "../Components/Table/Admin/AdminRoomTable";
import UserPastTable from "../Components/Table/User/UserPastTable";
import StaffRoomTable from "../Components/Table/Staff/StaffRoomTable";
import ScheduleTable from "../Components/Table/User/ScheduleTable";
import AdminTransactionTable from "../Components/Table/Admin/AdminTransactionTable";

function LoginPage() {
	return (
		<div className="flex flex-col justify-center w-full items-center align-middle gap-5">
			LoginPage
			<SearchCard />
			<UserCurrentTable />
			<UserPastTable />
			< ScheduleTable />
			<FilterSortAccordion />
			<StaffRoomTable />
			<StaffPromoTable />
			<AdminRoomTable />
			<AdminTransactionTable />
			<div className="h-96"></div>
		</div>
	);
}

export default LoginPage;
