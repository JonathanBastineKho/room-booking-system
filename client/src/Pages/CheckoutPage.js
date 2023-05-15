import React, { useContext, useEffect, useState } from "react";
import BookingSummaryCard from "../Components/Checkout/BookingSummaryCard";
import PaymentSummaryCard from "../Components/Checkout/PaymentSummaryCard";
import { Button, TextInput } from "flowbite-react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { format, getHours, setHours } from "date-fns";
import { AuthContext } from "../Components/Authentication/AuthContext";

function CheckoutPage() {
	const [promo, setPromo] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const [discount, setDiscount] = useState({
		code: "",
		percentage: 0,
	});
	const { token } = useContext(AuthContext);
	const booking = {
		name: searchParams.get("roomName"),
		startDateTime: setHours(
			new Date(searchParams.get("date")),
			parseInt(searchParams.get("startTime")) + 9
		),
		endDateTime: setHours(
			new Date(searchParams.get("date")),
			parseInt(searchParams.get("endTime")) + 10
		),
		desc: "A private meeting room located at SIM HQ Blk B",
		capacity: 10,
		pricePerHours: 5,
	};
	const getPromoCode = () => {
		if (token) {
			axios
				.get(
					`/api/view_promo_discount?promoCode=${promo}&startDate=${format(
						booking.startDateTime,
						"yyyy-MM-dd HH"
					)}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				.then((res) => {
					if (res.data.success) {
						setDiscount({
							code: promo,
							percentage: parseInt(res.data.discount),
						});
					} else {
						setDiscount({
							code: promo,
							percentage: 0,
						});
						alert(`${promo} is invalid.`);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const subtotal =
		booking.pricePerHours *
		(getHours(booking.endDateTime) - getHours(booking.startDateTime));

	const total = (subtotal * (100 - discount.percentage)) / 100;

	return (
		<div className="flex flex-row w-full m-20 mt-40 gap-x-10 items-center justify-center align-middle">
			<BookingSummaryCard booking={booking} />
			<div className="flex flex-col justify-start">
				<div className="flex flex-col text-white font-bold text-2xl mb-5">
					Redeem Promo Code
					<div className="flex flex-row mt-2 gap-x-2 w-full">
						<TextInput
							id="name"
							type="text"
							placeholder="Enter promo code"
							onChange={(ev) => setPromo(ev.target.value)}
							className="w-11/12"
						/>
						<Button onClick={() => getPromoCode()}>Redeem</Button>
					</div>
					{discount.percentage > 0 ? (
						<div className="text-green-500 text-sm font-medium mt-2">
							Valid! Here's a {discount.percentage}% discount.
						</div>
					) : discount.code ? (
						<div className="text-red-500 text-sm font-medium mt-2">
							Invalid promo code!
						</div>
					) : (
						<div />
					)}
				</div>
				<PaymentSummaryCard
					subtotal={subtotal}
					total={total}
					discount={discount.percentage}
				/>

				<Link
					to={`/payment?roomName=${searchParams.get(
						"roomName"
					)}&date=${format(
						new Date(searchParams.get("date")),
						"yyyy-MM-dd"
					)}
						&startTime=${parseInt(searchParams.get("startTime")) + 9}
						&endTime=${parseInt(searchParams.get("endTime")) + 10}
						&subtotal=${subtotal}
						&promocode=${discount.code}`}
				>
					<Button className="mt-10 p-5 mb-20 w-full">
						<div className="text-4xl font-bold">Checkout</div>
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default CheckoutPage;
