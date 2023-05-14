// Imported Libraries
import { Accordion, Label, Select, ToggleSwitch } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";

// Imported local dependencies
import RangeSlider from "./RangeSlider";

// Imported icons
import { FaSortAmountDown, FaSortAmountUpAlt, FaFilter } from "react-icons/fa";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";

export default function FilterAccordion(props) {
	const { token } = useContext(AuthContext);
	const [roomType, setRoomType] = useState([]);
	const currencyFormat = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	// Dummy get Room Type -> change with api
	const getRoomTypesList = () => {
		if (token) {
			axios
				.get("/api/types_of_rooms", {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					setRoomType(res.data.type_of_rooms);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	useEffect(() => {
		getRoomTypesList();
	}, []);

	return (
		<Accordion alwaysOpen={true} className="w-72">
			<Accordion.Panel>
				<Accordion.Title>
					<div className="flex flex-row items-center">
						<FaFilter className="mr-3" />
						<span className="font-bold mr-2">Filter by:</span>
					</div>
				</Accordion.Title>
				<Accordion.Content>
					<div className="flex flex-col gap-5">
						<div>
							<div className="mb-2 block">
								<Label htmlFor="roomtype" value="Room type:" />
							</div>
							<Select
								id="roomtype"
								required={true}
								onChange={(ev) => {
									props.setRoomType(ev.currentTarget.value);
								}}
							>
								<option value="Showing All">Showing All</option>
								{roomType.map((value) => (
									<option key={value} value={value}>
										{value}
									</option>
								))}
							</Select>
						</div>
						<div>
							<div className="mb-2 block">
								<Label
									htmlFor="sortby"
									value={`Price Range: 
									${currencyFormat.format(props.price.min)} - ${currencyFormat.format(
										props.price.max
									)}`}
								/>
							</div>
							<div className="w-full">
								<RangeSlider
									data={props.price}
									setData={(val) => props.setPrice(val)}
									min={0}
									max={100}
									step={5}
								/>
							</div>
						</div>
						<div>
							<div className="mb-2 block">
								<Label
									htmlFor="sortby"
									value={`Capacity: 
									${props.capacity.min} pax - ${props.capacity.max} pax`}
								/>
							</div>
							<div className="w-full">
								<RangeSlider
									data={props.capacity}
									setData={(val) => props.setCapacity(val)}
									min={0}
									max={20}
									step={2}
								/>
							</div>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Panel>
		</Accordion>
	);
}
