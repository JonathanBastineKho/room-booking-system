import React, { useContext, useEffect, useState } from "react";
import { Card, Footer } from "flowbite-react";
import { format, getHours, setHours } from "date-fns";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";

export function PaymentDetails(props) {
	const { token } = useContext(AuthContext);

	const [discount, setDiscount] = useState({
		code: "",
		percentage: 0,
	});

	useEffect(() => {
		if (props.booking.promoCode !== null) {
			getPromoCode();
		} else {
			setDiscount((prev) => ({...prev, code: "N/A"}))
		}
	}, []);

	const getPromoCode = () => {
		if (token) {
			axios
				.get(
					`/api/view_promo_discount?promoCode=${
						props.booking.promoCode
					}&startDate=${format(
						props.booking.startDateTime,
						"yyyy-MM-dd"
					)}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				.then((res) => {
					if (res.data.success) {
						setDiscount({
							code: props.booking.promoCode,
							percentage: parseInt(res.data.discount),
						});
					} else {
						setDiscount({
							code: props.booking.promoCode,
							percentage: 0,
						});
						alert(`${props.booking.promoCode} is invalid.`);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const moneySyntax = (money) => {
		const formattedValue = `$${money.toFixed(2)}`;
		return formattedValue;
	};

	const timeSyntax = (dateObject) => {
		// this const is not used
		let h = addZero(dateObject.getHours());
		let m = addZero(dateObject.getMinutes());
		let time = h + ":" + m;
		return time;
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

	const total = (props.booking.price * (100 - discount.percentage)) / 100;

	return (
		<div className="">
			<Card className="w-96 rounded-lg">
				<div className="flex flex-col gap-1 font-bold">
					<div className="flex text-center ">
						<span className="text-white text-center text-3xl pb-2">
							Payment Details
						</span>
					</div>
					<div className="">
						<div className="flex w-full mb-3 mt-5 justify-between">
							<span className="text-white">Room name </span>
							<span className="text-zinc-400 ">
								{" "}
								{props.booking.name}
							</span>
						</div>

						<div className="flex w-full mb-3 justify-between">
							<span className="text-white">Date </span>
							<span className="text-zinc-400 ">
								{" "}
								{dateSyntax(props.booking.startDateTime)}{" "}
							</span>
						</div>

						<div className="flex w-full mb-8 justify-between">
							<span className="text-white">Time </span>
							<span className="text-zinc-400 ">
								{format(
									setHours(
										new Date(),
										props.booking.startDateTime.getHours()
									),
									"h:00 aaa"
								)}{" "}
								to{" "}
								{format(
									setHours(
										new Date(),
										props.booking.endDateTime.getHours()
									),
									"h:00 aaa"
								)}
							</span>
						</div>

						<div className=" font-extrabold">
							<div className="flex w-full mb-3 justify-between">
								<span className="text-white font-extrabold">
									Subtotal{" "}
								</span>
								<span className="text-zinc-400">
									{moneySyntax(props.booking.price)}{" "}
								</span>
							</div>

							<div className="flex w-full mb-3 justify-between">
								<span className="text-white">Promo code </span>
								<span className="text-zinc-400">
									{discount.code}{" "}
								</span>
							</div>

							<div className="flex w-full  justify-between mb-5">
								<span className="text-white">Discount </span>
								<span className="text-zinc-400">
									{moneySyntax(
										(discount.percentage / 100) * props.booking.price
									)}
								</span>
							</div>

							<div className="mt-3 border-t-2">
								<div className="flex flex-row w-full justify-between text-3xl pt-5">
									<span className="text-white">Total </span>{" "}
									<span className="text-zinc-400">
										{moneySyntax(total)}{" "}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}

export default PaymentDetails;
