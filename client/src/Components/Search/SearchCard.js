// Imported Libraries
import React, { useState } from "react";
import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";

// Imported local dependencies
import DatePicker from "./DatePicker";

// Imported Icons
import { AiOutlineSearch } from "react-icons/ai";
import CapacityCheckbox from "./CapacityCheckbox";

function SearchCard() {
	const [filter, setFilter] = useState({
		name: "",
		date: new Date(),
		cap_2: false,
		cap_5: false,
		cap_10: false,
		cap_15: false,
		cap_20: false
	});

	const searchRoom = () => {
		console.log(filter)
	} 

	return (
		<Card>
			<form className="flex flex-col gap-4">
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
				<div className="flex flex-row gap-10">
					<div>
						<div className="mb-2 block">
							<Label htmlFor="date" value="Select Date" />
						</div>
						<DatePicker
							id="date"
							data={filter}
							setData={setFilter}
							update_key="date"
							min_date={new Date()}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="capacity" value="Select Capacity (pax)" />
						</div>
						<CapacityCheckbox setData={setFilter} />
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
