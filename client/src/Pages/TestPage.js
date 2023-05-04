import React from "react";
import SearchCard from "../Components/Search/SearchCard";
import UserCurrentTable from "../Components/Table/User/UserCurrentTable";
import UserPastTable from "../Components/Table/User/UserPastTable";

export default function TestPage() {
    console.log("test page rendered");
    return (
        <div className="flex flex-col justify-center w-full items-center align-middle gap-5">
            TestPage
            <SearchCard />
            <UserCurrentTable />
            <UserPastTable />
        </div>
    );
}
