import React, { useEffect, useState } from "react";
import SuccessfulPaymentCard from "../Components/Checkout/SuccessfulPaymentCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setHours } from "date-fns";

function SuccessfulPaymentPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [seconds, setSeconds] = useState("3");

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
	};

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function autoNavigate() {
		await sleep(1000);
		setSeconds("2");
		await sleep(1000);
		setSeconds("1");
		await sleep(1000);
		setSeconds("0");
		navigate("/");
	}

	useEffect(() => {
		autoNavigate();
	}, []);

	return (
		<div className="flex flex-col justify-center w-100 mt-20">
			<div className="flex flex-row justify-center">
				<SuccessfulPaymentCard booking={booking} />
			</div>
			<div className="text-white font-lg font-semibold mt-5 text-center">
				Automatically redirecting you in {seconds} seconds.
			</div>
		</div>
	);
}

export default SuccessfulPaymentPage;
