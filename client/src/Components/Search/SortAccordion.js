// Imported Libraries
import { Accordion, Label, Select, ToggleSwitch } from "flowbite-react";
import React from "react";

// Imported icons
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";

export default function SortAccordion(props) {
	return (
		<Accordion alwaysOpen={true} className="w-72 h-11">
			<Accordion.Panel>
				<Accordion.Title>
					<div className="flex flex-row items-center">
						{props.ascending ? (
							<FaSortAmountUpAlt className="mr-3" />
						) : (
							<FaSortAmountDown className="mr-3" />
						)}
						<span className="font-bold mr-2">Sort by:</span>
						{props.sortBy}
					</div>
				</Accordion.Title>
				<Accordion.Content>
					<div className="z-0 flex flex-col gap-5">
						<div>
							<div className="mb-2 block">
								<Label htmlFor="sortby" value="Sort by:" />
							</div>
							<Select
								id="sortby"
								required={true}
								onChange={(ev) => {
									props.setSortBy(ev.currentTarget.value);
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
										props.ascending ? "text-gray-500" : "text-white"
									}`}
								>
									Descending
								</div>
								<ToggleSwitch
									checked={props.ascending}
									onChange={() => props.setAscending(!props.ascending)}
								/>
								<div
									className={`mr-3 ${
										props.ascending ? "text-white" : "text-gray-500"
									}`}
								>
									Ascending
								</div>
							</div>
						</div>
					</div>
				</Accordion.Content>
			</Accordion.Panel>
		</Accordion>
	);
}
