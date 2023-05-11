import React from "react";
import { useSearchParams } from "react-router-dom";

function SearchResultPage() {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<div>
			<div>{searchParams.get("roomName")}</div>
			<div>{searchParams.get("dateTime")}</div>
			<div>{searchParams.get("capacity")}</div>
		</div>
	);
}

export default SearchResultPage;
