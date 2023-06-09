import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import HorizontalSearchCard from "../Components/Search/HorizontalSearchCard";
import FilterSortAccordion from "../Components/Search/FilterSortAccordion";
import { AuthContext } from "../Components/Authentication/AuthContext";
import RoomCard from "../Components/Rooms/RoomCard";
import { format } from "date-fns";
import { Spinner } from "flowbite-react";

export const DateContext = createContext();

function SearchResultPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate()
	const { token, logout } = useContext(AuthContext);
	const [rooms, setRooms] = useState([]);
	const dateTime = new Date(searchParams.get("dateTime"));
	const [sortBy, setSortBy] = useState({
		by: "name",
		ascending: true,
	});
	const [roomType, setRoomType] = useState("Showing All");
	const [price, setPrice] = useState({
		min: 0,
		max: 100,
	});
	const [capacity, setCapacity] = useState({
		min: 0,
		max: 20,
	});
	const [isSearching, setIsSearching] = useState(true);
	const [isSorting, setIsSorting] = useState(true);

	const getParams = useCallback(() => {
		let params = `dateTime=${searchParams.get(
			"dateTime"
		)}&roomName=${searchParams.get("roomName")}`;
		if (searchParams.get("cap_2") === "true") {
			params += "&capacity=2";
		}
		if (searchParams.get("cap_5") === "true") {
			params += "&capacity=5";
		}
		if (searchParams.get("cap_10") === "true") {
			params += "&capacity=10";
		}
		if (searchParams.get("cap_15") === "true") {
			params += "&capacity=15";
		}
		if (searchParams.get("cap_20") === "true") {
			params += "&capacity=20";
		}
		return params;
	}, [searchParams]);

	const searchRooms = useCallback(() => {
		if (token) {
			axios
				.get(`/api/search?${getParams()}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					setRooms(res.data.rooms);
					setIsSearching(false);
				})
				.catch((error) => {
					console.log(error);
					logout();
				});
		}
	}, [token, getParams, logout]);

	// Dummy sort -> change with table library sorting/api
	const sort = useCallback((key) => {
		setRooms(
			rooms.sort((a, b) => {
				let x = 0;
				if (a[key.by] > b[key.by]) {
					x = 1;
				} else if (a[key.by] < b[key.by]) {
					x = -1;
				}
				if (!key.ascending) {
					x *= -1;
				}
				return x;
			})
		);
	}, [rooms]);

	// Dummy filter -> change with table library filter/api
	const filter = (room) => {
		if (roomType !== "Showing All" && room.roomType !== roomType) {
			console.log(roomType);
			return false;
		}
		if (room.price < price.min || room.price > price.max) {
			return false;
		}
		if (room.capacity < capacity.min || room.capacity > capacity.max) {
			return false;
		}
		if (room.price < price.min || room.price > price.max) {
			return false;
		}
		return true;
	};

	// useEffect(() => {
	// 	props.handleFilter(roomType, price, capacity, time);
	// }, [roomType, price, capacity, time]);

	useEffect(() => {
		const date = searchParams.get("dateTime");
		console.log(date);
		if (new Date(date).getDate() === new Date().getDate() && new Date().getHours() > 17){
			navigate(`/search?roomName=${searchParams.get("roomName")}&dateTime=${format(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd')}&cap_2=${searchParams.get("cap_2")}&cap_5=${searchParams.get("cap_5")}&cap_10=${searchParams.get("cap_10")}&cap_15=${searchParams.get("cap_15")}&cap_20=${searchParams.get("cap_20")}`);
		}
	}, [])

	useEffect(() => {
		searchRooms();
	}, [searchParams, searchRooms]);

	useEffect(() => {
		console.log(isSearching);
		if (!isSearching){
			sort(sortBy);
			setIsSorting(false);
		}
		
	}, [sortBy, sort, isSearching, rooms]);

	return (
		<div className="flex flex-col items-center">
			<HorizontalSearchCard
				searchParams={searchParams}
				className="w-11/12 mt-5 max-w-[70rem]"
			/>
			<div className="text-white font-semibold text-lg my-1 ">
				{`Showing search results for ${format(dateTime, "dd MMMM yyyy")}.`}
			</div>
			<div className="flex flex-col mt-3 w-11/12 max-w-[70rem]">
				<div className="flex flex-row justify-start ">
					<div className="w-72">
						<FilterSortAccordion
							roomType={roomType}
							setRoomType={setRoomType}
							price={price}
							setPrice={setPrice}
							capacity={capacity}
							setCapacity={setCapacity}
							sortBy={sortBy.by}
							setSortBy={(val) =>
								setSortBy((prev) => ({ ...prev, by: val }))
							}
							ascending={sortBy.ascending}
							setAscending={(val) =>
								setSortBy((prev) => ({ ...prev, ascending: val }))
							}
							setIsLoading={setIsSorting}
							// handleFilter={handleFilter}
						/>
					</div>
					<div className="mx-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
						{(isSearching || isSorting) && <Spinner />}
						{!isSearching && !isSorting && rooms.map((value) => {
							if (filter(value)) {
								return (
									<div key={value.name}>
										<DateContext.Provider value={{ dateTime }}>
											<RoomCard roomJson={value} date={dateTime} />
										</DateContext.Provider>
									</div>
								);
							}
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchResultPage;
