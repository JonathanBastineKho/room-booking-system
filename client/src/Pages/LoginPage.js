import React from "react";
import RoomModal from "../Components/Rooms/RoomModal";
import RoomCard from "../Components/Rooms/RoomCard";

function LoginPage() {
	return (
		<div className="flex flex-col justify-center w-full items-center align-middle gap-5">
			<RoomCard />
			<RoomModal />
		</div>
	);
}

export default LoginPage;
