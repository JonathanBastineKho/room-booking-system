// Imported Libraries
import React, { useState } from "react";
import { Button } from "flowbite-react";

// Imported Local dependencies
import SearchCard from "../Components/Search/SearchCard";
import UserCurrentTable from "../Components/Table/User/UserCurrentTable";
import UserPastTable from "../Components/Table/User/UserPastTable";
import StaffCreatePromoModal from "../Components/Modal/StaffCreatePromoModal";
import StaffPromoTable from "../Components/Table/Staff/StaffPromoTable";
import StaffRoomTable from "../Components/Table/Staff/StaffRoomTable";
export default function TestPage() {
	console.log("test page rendered");
	const [modalShow, setModalShow] = useState(false);
	return (
		<div className="flex flex-col justify-center w-full items-center align-middle gap-5">
			TestPage
			<SearchCard />
			<UserCurrentTable />
			<UserPastTable />
			<StaffPromoTable />
			<StaffRoomTable />
			<StaffCreatePromoModal
				show={modalShow}
				onClose={() => setModalShow(false)}
			/>
			<Button onClick={() => setModalShow(true)}></Button>
		</div>
	);
}
