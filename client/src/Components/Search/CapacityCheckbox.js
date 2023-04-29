// Imported Libraries
import { Checkbox, Label } from "flowbite-react";
import React from "react";

function CapacityCheckbox(props) {
	const handleCheck = (ev, key) =>
		props.setData((prev) => ({
			...prev,
			[key]: ev.target.checked,
		}));
	return (
		<div className={props.className}>
			<div id="capacity" className="grid grid-cols-3 gap-4 gap-y-1">
				<div className="flex flex-row gap-2 items-center">
					<Checkbox
						id="cap1"
						onChange={(ev) => handleCheck(ev, "cap_2")}
					/>
					<Label htmlFor="cap1" value="2" />
				</div>
				<div className="flex flex-row gap-2 items-center">
					<Checkbox
						id="cap2"
						onChange={(ev) => handleCheck(ev, "cap_5")}
					/>
					<Label htmlFor="cap2" value="5" />
				</div>
				<div className="flex flex-row gap-2 items-center">
					<Checkbox
						id="cap3"
						onChange={(ev) => handleCheck(ev, "cap_10")}
					/>
					<Label htmlFor="cap3" value="10" />
				</div>
				<div className="flex flex-row gap-2 items-center">
					<Checkbox
						id="cap4"
						onChange={(ev) => handleCheck(ev, "cap_15")}
					/>
					<Label htmlFor="cap4" value="15" />
				</div>
				<div className="flex flex-row gap-2 items-center">
					<Checkbox
						id="cap5"
						onChange={(ev) => handleCheck(ev, "cap_20")}
					/>
					<Label htmlFor="cap5" value="20" />
				</div>
			</div>
		</div>
	);
}

export default CapacityCheckbox;
