import React, { useContext, useEffect, useState } from "react";
import { Card, Footer } from "flowbite-react";
import { format, setHours } from "date-fns";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";

export function BookingSummaryCard(props) {
	const moneySyntax = (money) => {
		const formattedValue = `$${money.toFixed(2)}`;
		return formattedValue;
	};

	const dateSyntax = (dateObject) => {
		const daysOfWeek = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		const dayOfWeek = daysOfWeek[dateObject.getDay()];
		const dayOfMonth = dateObject.getDate();
		const month = months[dateObject.getMonth()];
		const year = dateObject.getFullYear();

		return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
	};

	function addZero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}

	return (
		<div className="">
			<Card href="#" className="w-96 h-1/4  rounded ">
				<div className="flex flex-col">
					<span className="font-bold text-4xl text-white text-center">
						Booking Summary
					</span>{" "}
					<br />
					<div className="flex items-center justify-center mb-3">
						<img
							className="h-26"
							src={`http://127.0.0.1:5000/api/get_room_image?roomName=${props.booking.name}`}
						></img>
					</div>
					<span className="font-bold text-2xl text-white text-center">
						{props.booking.name}
					</span>
					<span className="text-gray text-xs text-zinc-400 font-bold text-center align-middle px-2">
						{props.booking.description}
					</span>
				</div>
				<div className="flex flex-col gap-1 font-bold border-t-2 border-white pt-4 ">
					<div className="flex w-full justify-between">
						<span className="text-white">Date </span>{" "}
						<span className="text-zinc-400">
							{dateSyntax(props.booking.startDateTime)}
						</span>
					</div>
					<div className="flex flex-row w-full justify-between">
						<span className="text-white">Time </span>
						<span className="text-zinc-400">
							{format(
								setHours(
									new Date(),
									props.booking.startDateTime.getHours()
								),
								"h:00aaa"
							)}{" "}
							to{" "}
							{format(
								setHours(
									new Date(),
									props.booking.endDateTime.getHours()
								),
								"h:00aaa"
							)}
						</span>
					</div>
					<div className="flex flex-row w-full justify-between">
						<span className="text-white">Capacity </span>{" "}
						<span className="text-zinc-400">{props.booking.capacity} pax</span>
					</div>
					<div className="flex flex-row w-full justify-between">
						<span className="text-white">Pricing </span>{" "}
						<span className="text-zinc-400">
							{moneySyntax(props.booking.pricePerHours)} / hour
						</span>
					</div>
				</div>
			</Card>
		</div>
	);
}

export default BookingSummaryCard;
