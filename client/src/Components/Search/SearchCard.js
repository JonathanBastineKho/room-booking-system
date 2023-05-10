// Imported Libraries
import React, { useState } from "react";
import { Card, Label, TextInput, Button } from "flowbite-react";

// Imported local dependencies
import DatePicker from "./DatePicker";

// Imported Icons
import { AiOutlineSearch } from "react-icons/ai";
import CapacityCheckbox from "./CapacityCheckbox";

function SearchCard(props) {
	const [filter, setFilter] = useState({
		name: "",
		date: new Date(),
		cap_2: true,
		cap_5: true,
		cap_10: true,
		cap_15: true,
		cap_20: true,
	});

	const searchRoom = () => {
		console.log(filter);
	};

	return (
		<Card className={props.className}>
			<form className={"flex flex-col gap-4 "}>
				<div>
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
				<div className="flex flex-row gap-10 w-full">
					<div className="w-1/2">
						<div className="mb-2 block">
							<Label htmlFor="date" value="Select Date" />
						</div>
						<DatePicker
							id="date"
							data={filter}
							setData={setFilter}
							update_key="date"
							min_date={new Date()}
							className="w-full"
						/>
					</div>
					<div className="w-1/2">
						<div className="mb-2 block">
							<Label htmlFor="capacity" value="Select Capacity (pax)" />
						</div>
						<CapacityCheckbox setData={setFilter} data={filter} />
					</div>
				</div>
				<Button type="button" onClick={() => searchRoom()}>
					Search Room
				</Button>
			</form>
		</Card>
	);
}

export default SearchCard;
