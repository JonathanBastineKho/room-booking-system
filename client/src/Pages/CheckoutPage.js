import React, { useContext, useEffect, useState } from "react";
import BookingSummaryCard from "../Components/Checkout/BookingSummaryCard";
import PaymentSummaryCard from "../Components/Checkout/PaymentSummaryCard";
import { Button, TextInput } from "flowbite-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { format, getHours, setHours } from "date-fns";
import { AuthContext } from "../Components/Authentication/AuthContext";

function CheckoutPage() {
	const navigate = useNavigate();
	const [promo, setPromo] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const [discount, setDiscount] = useState({
		code: "",
		percentage: 0,
	});
	const { token } = useContext(AuthContext);
	const [booking, setBooking] = useState({
		name: searchParams.get("roomName"),
		startDateTime: setHours(
			new Date(searchParams.get("date")),
			parseInt(searchParams.get("startTime")) + 9
		),
		endDateTime: setHours(
			new Date(searchParams.get("date")),
			parseInt(searchParams.get("endTime")) + 10
		),
		description: "",
		pricePerHours: 0,
		capacity: 0
	});

	useEffect(() => {
		getRoomDetails();
	}, []);

	const getRoomDetails = () => {
		if (token) {
			axios
				.get(`/api/view_room_details?roomName=${booking.name}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					if (res.data.success) {
						setBooking((prev) => ({
							...prev,
							description: res.data.room.description,
							pricePerHours: res.data.room.price,
							capacity: res.data.room.capacity,
						}));
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const getPromoCode = () => {
		if (token) {
			axios
				.get(
					`/api/view_promo_discount?promoCode=${promo}&startDate=${format(
						booking.startDateTime,
						"yyyy-MM-dd"
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

	const validateCheckout = () => {
		if (discount.code === "" || (discount.code !== "" && discount.percentage > 0)){
			navigate(`/payment?roomName=${searchParams.get(
				"roomName"
			)}&date=${format(
				new Date(searchParams.get("date")),
				"yyyy-MM-dd"
			)}
				&startTime=${parseInt(searchParams.get("startTime")) + 9}
				&endTime=${parseInt(searchParams.get("endTime")) + 10}
				&subtotal=${subtotal}
				&promocode=${discount.code}`);
		}
	}

	return (
		<div className="flex flex-row w-full mt-40 gap-x-10 items-center justify-center">
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
					<Button className="mt-4 mb-20 w-full"
					onClick={validateCheckout}>
						<div className="text-xl font-bold">Checkout</div>
					</Button>
			</div>
		</div>
	);
}

export default CheckoutPage;
