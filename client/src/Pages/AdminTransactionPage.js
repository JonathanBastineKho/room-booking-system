import React, { useContext, useEffect, useState } from "react";
import AdminRoomChart from "../Components/Table/Admin/AdminRoomChart";
import AdminRoomTransactionTable from "../Components/Table/Admin/AdminTransactionTable";
import DatePicker from "../Components/Search/DatePicker";
import DropDownList from "../Components/Search/DropDownList";
import { Label } from "flowbite-react";
import axios from "axios";
import { AuthContext } from "../Components/Authentication/AuthContext";

function AdminTransactionPage() {
    const { token } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });
    const [roomSelection, setRoomSelection] = useState(["All rooms"]);
    const [selectedRoom, setSelectedRoom] = useState("All rooms")
    useEffect(() => {
        const startDate = filter.startDate;
        const endDate = filter.endDate;
        axios.get(
            "/api/view_bookings_admin",
            {
                params: {
                    startDateTime: `${startDate.getFullYear()}-${(
                        startDate.getMonth() + 1
                    )
                        .toString()
                        .padStart(2, "0")}-${startDate
                        .getDate()
                        .toString()
                        .padStart(2, "0")}`,
                    endDateTime: `${endDate.getFullYear()}-${(
                        endDate.getMonth() + 1
                    )
                        .toString()
                        .padStart(2, "0")}-${endDate
                        .getDate()
                        .toString()
                        .padStart(2, "0")}`,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((res) => {
            setData(res.data.bookings);
            setRoomSelection(["All rooms", ...new Set(res.data.bookings.map((booking) => booking.roomName))])
        })
        .catch((error) => {
            console.log(error);
        });
    }, [filter, token]);
    return (
        <div className="mt-12 mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:max-w-[100rem]">
            <p className="text-white text-4xl font-bold my-5">Total Sales</p>
            <div className="flex justify-between mb-4 items-end">
                <div className="flex gap-4">
                    <div>
                        <div className="mb-1 block">
                            <Label htmlFor="date" value="Start Date" />
                        </div>
                        <DatePicker
                            id="startDate"
                            data={filter}
                            setData={setFilter}
                            update_key="startDate"
                            className="w-36"
                        />
                    </div>
                    <div>
                        <div className="mb-1 block">
                            <Label htmlFor="date" value="End Date" />
                        </div>
                        <DatePicker
                            id="endDate"
                            data={filter}
                            setData={setFilter}
                            update_key="endDate"
                            className="w-36"
                        />
                    </div>
                </div>
                <div>
                    <DropDownList
                        selection_list={roomSelection}
                        selected_element={selectedRoom}
                        set_selected_element={setSelectedRoom}
                    />
                </div>
            </div>

            <AdminRoomChart />
            <p className="text-white text-4xl font-bold my-6">Transactions</p>
            <AdminRoomTransactionTable data={data} selected_room={selectedRoom}/>
        </div>
    );
}

export default AdminTransactionPage;
