// Imported Libraries
import { Accordion, Label, Select, ToggleSwitch } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { format, setHours } from "date-fns";

// Imported local dependencies
import RangeSlider from "./RangeSlider";

// Imported icons
import { FaSortAmountDown, FaSortAmountUpAlt, FaFilter } from "react-icons/fa";

export default function FilterSortAccordion(props) {
	const [sortBy, setSortBy] = useState("name");
	const [ascending, setAscending] = useState(true);
	const [roomType, setRoomType] = useState("Show all");
	const [price, setPrice] = useState({
		min: 0,
		max: 100,
	});
	const [capacity, setCapacity] = useState({
		min: 0,
		max: 20,
	});

	// For normalization issue we use 0-9 but we will add 9 to it so 9-18
	const [time, setTime] = useState({
		min: 0,
		max: 9,
	});

	const currencyFormat = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	// Dummy get Room Type -> change with api
	const getRoomTypesList = () => {
		return ["Room Type A", "Room Type B", "Room Type C"];
	};

	// Dummy sort -> change with table library sorting/api
	const sort = (key, order) => {
		console.log(`${key}, ${order}`);
	};

	// Dummy filter -> change with table library filter/api
	const filter = (rtype) => {
		console.log(`${rtype}`);
	};

	useEffect(() => {
		sort(sortBy, ascending);
	}, [sortBy, ascending]);

	useEffect(() => {
		filter(roomType);
	}, [roomType, price, capacity, time]);

	return (
		<Accordion alwaysOpen={true} className="w-72">
			<Accordion.Panel>
				<Accordion.Title>
					<div className="flex flex-row items-center">
						{ascending ? (
							<FaSortAmountUpAlt className="mr-3" />
						) : (
							<FaSortAmountDown className="mr-3" />
						)}
						<span className="font-bold mr-2">Sort by:</span>
						{sortBy}
					</div>
				</Accordion.Title>
				<Accordion.Content>
					<div className="flex flex-col gap-5">
						<div>
							<div className="mb-2 block">
								<Label htmlFor="sortby" value="Sort by:" />
							</div>
							<Select
								id="sortby"
								required={true}
								onChange={(ev) => {
									setSortBy(ev.currentTarget.value);
								}}
							>
								<option default value={"name"}>
									Room name
								</option>
								<option value={"type"}>Room type</option>
								<option value={"price"}>Price</option>
								<option value={"capacity"}>Capacity</option>
							</Select>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="order" value="Order by:" />
							</div>
							<div id="order" className="flex flex-row items-center">
								<div
									className={`mr-3 ${
										ascending ? "text-gray-500" : "text-white"
									}`}
								>
									Descending
								</div>
								<ToggleSwitch
									checked={ascending}
									onChange={() => setAscending(!ascending)}
								/>
								<div
									className={`mr-3 ${
										ascending ? "text-white" : "text-gray-500"
									}`}
								>
									Ascending
								</div>
							</div>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Panel>
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
									setRoomType(ev.currentTarget.value);
								}}
							>
								<option value="Showing All">Showing All</option>
								{getRoomTypesList().map((value) => (
									<option value={value}>{value}</option>
								))}
							</Select>
						</div>
						<div>
							<div className="mb-2 block">
								<Label
									htmlFor="sortby"
									value={`Price Range: 
									${currencyFormat.format(price.min)} - ${currencyFormat.format(price.max)}`}
								/>
							</div>
							<div className="w-full">
								<RangeSlider
									data={price}
									setData={setPrice}
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
									${capacity.min} pax - ${capacity.max} pax`}
								/>
							</div>
							<div className="w-full">
								<RangeSlider
									data={capacity}
									setData={setCapacity}
									min={0}
									max={20}
									step={2}
								/>
							</div>
						</div>
						<div>
							<div className="mb-2 block">
								<Label
									htmlFor="sortby"
									value={`Available Time: 
									${format(setHours(new Date(), time.min + 9), "h:00aaa")} - ${format(
										setHours(new Date(), time.max + 9),
										"h:00aaa"
									)}`}
								/>
							</div>
							<div className="w-full">
								<RangeSlider
									data={time}
									setData={setTime}
									min={0}
									max={9}
									step={1}
								/>
							</div>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Panel>
		</Accordion>
	);
}
