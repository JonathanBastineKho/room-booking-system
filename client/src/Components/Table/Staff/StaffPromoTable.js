// Imported Libraries
import { Table } from "flowbite-react";
import React from "react";

// Imported local dependencies
import StaffPromoTableRow from "./StaffPromoTableRow";
import { setHours } from "date-fns";

function StaffPromoTable(props) {
	// Dummy data -> change with props.data which will be extracted from API.
	const data = [
		{
			promoCode: "STARRAILGIFT",
			startDate: setHours(new Date(), 9),
			endDate: setHours(new Date(), 10),
			discount: 20,
		},
		{
			promoCode: "STARRAILGIFTS",
			startDate: setHours(new Date(), 11),
			endDate: setHours(new Date(), 17),
			discount: 10,
		},
	];

	// Dummy delete -> change with API
	const deletePromo = (promoCode, start) => {
		console.log("delete", promoCode, start);
	};

	// Dummy edit -> change with API
	const editPromo = (promoCode, start) => {
		console.log("edit", promoCode, start);
	};

	return (
		<Table hoverable={props.hoverable}>
			<Table.Head>
				<Table.HeadCell>Promo Code</Table.HeadCell>
				<Table.HeadCell>Start Datetime</Table.HeadCell>
				<Table.HeadCell>End Datetime</Table.HeadCell>
				<Table.HeadCell>Discount</Table.HeadCell>
				<Table.HeadCell>
					<span className="sr-only">Edit</span>
				</Table.HeadCell>
				<Table.HeadCell>
					<span className="sr-only">Delete</span>
				</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y">
				{data.map((value) => (
					<StaffPromoTableRow
						data={value}
						deletePromo={deletePromo}
						editPromo={editPromo}
					/>
				))}
			</Table.Body>
		</Table>
	);
}

export default StaffPromoTable;
