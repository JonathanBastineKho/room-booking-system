// Imported packages
import React, { useState } from "react";
import {
	addDays,
	addMonths,
	addYears,
	eachDayOfInterval,
	endOfMonth,
	format,
	getDate,
	getDay,
	isFuture,
	isPast,
	isSameDay,
	isSameMonth,
	isSaturday,
	isSunday,
	isToday,
	startOfMonth,
	subDays,
	subMonths,
} from "date-fns";

// Imported icons
import { AiFillCalendar } from "react-icons/ai";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

function DateButton(props) {
	return (
		<div
			className={`p-2 rounded-lg
			${
				(isToday(props.date) || isFuture(props.date)) &&
				!isSameDay(props.date, props.selected) &&
				"text-white font-semibold hover:bg-gray-500"
			} 
			${
				isPast(props.date) &&
				!isToday(props.date) &&
				"text-gray-500 hover:bg-transparent"
			} 
			${
				isSameDay(props.date, props.selected) &&
				"bg-blue-500 font-semibold text-white"
			}
			${props.className}`}
			onClick={() => {
				if (isFuture(props.date) || isToday(props.date)) {
					props.updateData(props.date);
				}
			}}
		>
			{getDate(props.date)}
		</div>
	);
}

export default function DatePicker(props) {
	const [open, setOpen] = useState(false);
	const [viewed, setViewed] = useState(startOfMonth(new Date()));
	const selected = props.data[props.update_key];

	const updateData = (key, value) => {
		props.setData((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	return (
		<div
			id="select"
			className={props.className}
			onBlur={() => {
				if (open) {
					setOpen(false);
				}
			}}
		>
			<div
				className={`w-full flex p-2.5 pl-3 flex-row gap-2 justify-start items-center align-middle bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
				onClick={() => setOpen(!open)}
				onBlur={() => setOpen(false)}
			>
				<AiFillCalendar size={20} className="text-gray-400" />
				<span
					className={`${
						(!selected || selected === -1) && "text-gray-400"
					}`}
				>
					{!selected || selected === -1
						? "Select date"
						: format(selected, "d MMM yyyy")}
				</span>
			</div>
			<div
				className={`z-50 absolute w-80 drop-shadow-md bg-gray-700 text-left flex-col mt-2 rounded-md 
							${open ? "h-auto" : "hidden"} `}
			>
				<div className="flex flex-row m-1 justify-center items-center gap-10 mb-2">
					<HiArrowLeft
						size={34}
						className={`p-2 text-gray-500 rounded-lg font-semibold 
									${!isSameMonth(viewed, props.min_date) && "text-white hover:bg-gray-500"}`}
						onClick={() => {
							if (!isSameMonth(viewed, props.min_date))
								setViewed(subMonths(viewed, 1));
						}}
					/>
					<span className="p-2 px-0 mx-2 text-center hover:bg-gray-500 rounded-md font-semibold w-32 text-white">
						{format(viewed, "MMMM yyyy")}
					</span>
					<HiArrowRight
						size={34}
						className={`p-2 text-gray-500 rounded-lg font-semibold 
									${
										!isSameMonth(
											viewed,
											addYears(props.min_date, 10)
										) && "text-white hover:bg-gray-500"
									}`}
						onClick={() => {
							if (!isSameMonth(viewed, addYears(props.min_date, 10)))
								setViewed(addMonths(viewed, 1));
						}}
					/>
				</div>
				<div className="grid grid-cols-7 m-1 mx-3 justify-center items-center gap-1 text-center text-gray-400 font-sans font-semibold">
					<span className="p-2">Su</span>
					<span className="p-2">Mo</span>
					<span className="p-2">Tu</span>
					<span className="p-2">We</span>
					<span className="p-2">Th</span>
					<span className="p-2">Fr</span>
					<span className="p-2">Sa</span>
				</div>
				<div className="grid grid-cols-7 m-1 mx-3 justify-center items-center text-center gap-1 text-gray-900 font-sans font-semibold">
					{isSunday(viewed) ? (
						<></>
					) : (
						eachDayOfInterval({
							start: subDays(
								endOfMonth(subMonths(viewed, 1)),
								parseInt(getDay(viewed)) - 1
							),
							end: endOfMonth(subMonths(viewed, 1)),
						}).map((date) => (
							<DateButton
								key={date}
								className="text-gray-300"
								date={date}
								updateData={(val) => {
									updateData(props.update_key, val);
									setOpen(false);
								}}
								selected={selected}
							/>
						))
					)}
					{eachDayOfInterval({
						start: viewed,
						end: endOfMonth(viewed),
					}).map((date) => (
						<DateButton
							key={date}
							date={date}
							updateData={(val) => {
								updateData(props.update_key, val);
								setOpen(false);
							}}
							selected={selected}
						/>
					))}
					{isSaturday(endOfMonth(viewed)) ? (
						<></>
					) : (
						eachDayOfInterval({
							start: addMonths(viewed, 1),
							end: addDays(
								addMonths(viewed, 1),
								5 - parseInt(getDay(endOfMonth(viewed)))
							),
						}).map((date) => (
							<DateButton
								key={date}
								className="text-gray-300"
								date={date}
								updateData={(val) => {
									updateData(props.update_key, val);
									setOpen(false);
								}}
								selected={selected}
							/>
						))
					)}
				</div>

				<div className="m-3 mb-2 flex flex-row gap-3 justify-between items-center align-middle">
					<div
						className="bg-blue-500 rounded-lg text-white text-center text-lg p-2 py-1 w-full m-1 hover:bg-blue-600 drop-shadow-sm"
						onClick={() => {
							updateData(props.update_key, new Date());
							setViewed(startOfMonth(new Date()));
							setOpen(false);
						}}
					>
						Today
					</div>
					<div
						className="border rounded-lg text-white text-center text-lg p-2 py-1 w-full m-1 hover:bg-gray-500 drop-shadow-sm border-gray-500"
						onClick={() => {
							updateData(props.update_key, -1);
							setViewed(startOfMonth(new Date()));
							setOpen(false);
						}}
					>
						Clear
					</div>
				</div>
			</div>
		</div>
	);
}
