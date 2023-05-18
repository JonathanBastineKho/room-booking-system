// Imported Libraries
import React, { useState } from "react";
import { Card, Label, TextInput, Button } from "flowbite-react";
import { Link, createSearchParams } from "react-router-dom";

// Imported local dependencies
import DatePicker from "./DatePicker";

// Imported Icons
import { AiOutlineSearch } from "react-icons/ai";
import CapacityCheckbox from "./CapacityCheckbox";
import { format } from "date-fns";

function HorizontalSearchCard(props) {
	const [filter, setFilter] = useState({
		name: props.searchParams.get("roomName"),
		date: new Date(props.searchParams.get("dateTime")),
		cap_2: props.searchParams.get("cap_2") === "true",
		cap_5: props.searchParams.get("cap_5") === "true",
		cap_10: props.searchParams.get("cap_10") === "true",
		cap_15: props.searchParams.get("cap_15") === "true",
		cap_20: props.searchParams.get("cap_20") === "true",
	});

	const search_params = new createSearchParams({
		roomName: filter.name,
		dateTime: format(filter.date, "yyyy-MM-dd"),
		cap_2: filter.cap_2,
		cap_5: filter.cap_5,
		cap_10: filter.cap_10,
		cap_15: filter.cap_15,
		cap_20: filter.cap_20,
	});

	return (
		<Card className={props.className}>
			<form className={"flex flex-row gap-4 items-center justify-center"}>
				<div className="w-[30rem]">
					<div className="mb-2 block">
						<Label htmlFor="name" value="Search Room Name" />
					</div>
					<TextInput
						id="name"
						type="text"
						icon={AiOutlineSearch}
						placeholder="Search by room name"
						required={true}
						onChange={(ev) =>
							setFilter((prev) => ({
								...prev,
								name: ev.target.value,
							}))
						}
					/>
				</div>
				<div className="w-[13rem]">
					<div className="mb-2 block">
						<Label htmlFor="date" value="Select Date" />
					</div>
					<DatePicker
						id="date"
						data={filter}
						setData={setFilter}
						update_key="date"
						min_date={new Date().getHours() > 17 ? new Date().setDate(new Date().getDate() + 1) : new Date()}
						className="w-full"
						
					/>
				</div>
				<div className="w-[10rem]">
					<div className="mb-2 block">
						<Label htmlFor="capacity" value="Select Capacity (pax)" />
					</div>
					<CapacityCheckbox setData={setFilter} data={filter} />
				</div>
				<div className="w-[10rem]">
					<div className="mb-2 block">&nbsp;</div>
					<Link to={"/search?" + search_params}>
						<Button type="button" className="w-full mt-2">
							Search Room
						</Button>
					</Link>
				</div>
			</form>
		</Card>
	);
}

export default HorizontalSearchCard;
