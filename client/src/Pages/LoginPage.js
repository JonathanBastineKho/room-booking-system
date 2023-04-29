import React from "react";
import SearchCard from "../Components/Search/SearchCard";
import UserCurrentTable from "../Components/Table/UserCurrentTable";
import UserPastTable from "../Components/Table/UserPastTable";

function LoginPage() {
	return (
		<div className="flex flex-col justify-center w-full items-center align-middle gap-5">
			LoginPage
			<SearchCard />
			<UserCurrentTable />
			<UserPastTable />
		</div>
	);
}

export default LoginPage;
