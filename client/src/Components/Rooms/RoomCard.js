import React, { useState } from "react";
import { Card, Button } from "flowbite-react";
import RoomModal from "./RoomModal";

function RoomCard(props) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<Card
				imgSrc={`http://127.0.0.1:5000/api/get_room_image?roomName=${props.roomJson.name}`}
				onClick={() => setIsOpen(true)}
			>
				<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{props.roomJson.name}
				</h5>
				<p className="font-normal text-gray-700 dark:text-gray-400">
					Type: {props.roomJson.roomType}
					<br />
					Capacity: {props.roomJson.capacity} pax
					<br />
					Pricing: ${props.roomJson.price}/hour
				</p>
				<Button onClick={() => setIsOpen(true)}>Read more →</Button>
			</Card>
			<RoomModal
				roomJson={props.roomJson}
				show={isOpen}
				imageUrl={`http://127.0.0.1:5000/api/get_room_image?roomName=${props.roomJson.name}`}
				onClose={() => setIsOpen(false)}
				date={props.date}
			/>
		</div>
	);
}

export default RoomCard;
