import React, { useContext, useState } from "react";
import { Button } from "flowbite-react";
import { Navbar } from "flowbite-react";
import PaymentDetails from "../Components/Checkout/PaymentDetails";
import paynowQR from "../Assets/image/paynowQR.jpeg";
import {
	Navigate,
	redirect,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { format, getHours, setHours } from "date-fns";
import axios from "axios";
import { AuthContext } from "../Components/Authentication/AuthContext";

function PaymentPage() {
	const [searchParams] = useSearchParams();
	const { token } = useContext(AuthContext);
	const navigate = useNavigate();
	const booking = {
		name: searchParams.get("roomName"),
		startDateTime: setHours(
			new Date(searchParams.get("date")),
			searchParams.get("startTime")
		),
		endDateTime: setHours(
			new Date(searchParams.get("date")),
			searchParams.get("endTime")
		),
		price: parseFloat(searchParams.get("subtotal")),
		promoCode:
			searchParams.get("promocode") !== ""
				? searchParams.get("promocode")
				: null,
	};

	const createBooking = () => {
		if (token) {
			axios
				.post(
					"/api/create_booking",
					{
						roomName: booking.name,
						startDateTime: format(booking.startDateTime, "yyyy-MM-dd HH"),
						endDateTime: format(booking.endDateTime, "yyyy-MM-dd HH"),
						promoCode: booking.promoCode,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((res) => {
					if (res.data.success) {
						return navigate(
							`/successPayment?roomName=${booking.name}&date=${format(
								booking.startDateTime,
								"yyyy-MM-dd"
							)}&startTime=${getHours(booking.startDateTime)}&endTime=${getHours(booking.endDateTime)}`
						);
					} else {
						alert("Booking innapropriate");
						console.log(res.data);
						navigate('/');
					}
				})
				.catch((error) => {
					alert("Failed to book room.");
					console.log(error);
				});
		}
	};

	return (
		<div className="w-full flex justify-center mt-24">
			<img
				src={paynowQR}
				className="w-96 mr-10"
				onClick={() => {
					createBooking();
				}}
			></img>
			<PaymentDetails booking={booking} />
			{/* test */}
		</div>
	);
}

export default PaymentPage;
