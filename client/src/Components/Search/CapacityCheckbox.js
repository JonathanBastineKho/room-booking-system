// Imported Libraries
import { Checkbox, Label } from "flowbite-react";
import React from "react";

function CapacityCheckbox(props) {
	const handleCheck = (ev, key) => {
		if (
			props.data.cap_2 +
				props.data.cap_5 +
				props.data.cap_10 +
				props.data.cap_15 +
				props.data.cap_20 <
				2 &&
			!ev.target.checked
		) {
		} else {
			props.setData((prev) => ({
				...prev,
				[key]: ev.target.checked,
			}));
		}
	};
	return (
		<div className={props.className}>
			<div id="capacity" className="grid grid-cols-3 gap-4 gap-y-1">
				<div className="flex flex-row gap-2 items-center">
					<Checkbox
						id="cap1"
						checked={props.data.cap_2}
						onChange={(ev) => handleCheck(ev, "cap_2")}
					/>
					<Label htmlFor="cap1" value="2" />
				</div>
				<div className="flex flex-row gap-2 items-center">
					<Checkbox
						id="cap2"
						checked={props.data.cap_5}
						onChange={(ev) => handleCheck(ev, "cap_5")}
					/>
					<Label htmlFor="cap2" value="5" />
				</div>
				<div className="flex flex-row gap-2 items-center">
					<Checkbox
						id="cap3"
						checked={props.data.cap_10}
						onChange={(ev) => handleCheck(ev, "cap_10")}
					/>
					<Label htmlFor="cap3" value="10" />
				</div>
				<div className="flex flex-row gap-2 items-center">
					<Checkbox
						id="cap4"
						checked={props.data.cap_15}
						onChange={(ev) => handleCheck(ev, "cap_15")}
					/>
					<Label htmlFor="cap4" value="15" />
				</div>
				<div className="flex flex-row gap-2 items-center">
					<Checkbox
						id="cap5"
						checked={props.data.cap_20}
						onChange={(ev) => handleCheck(ev, "cap_20")}
					/>
					<Label htmlFor="cap5" value="20" />
				</div>
			</div>
		</div>
	);
}

export default CapacityCheckbox;
