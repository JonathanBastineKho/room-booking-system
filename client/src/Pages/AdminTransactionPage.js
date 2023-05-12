import React, { useEffect, useState } from "react";
import AdminRoomChart from "../Components/Table/Admin/AdminRoomChart";
import AdminRoomTransactionTable from "../Components/Table/Admin/AdminTransactionTable";
import DatePicker from "../Components/Search/DatePicker";
import DropDownList from "../Components/Search/DropDownList";
import { Label } from "flowbite-react";

function AdminTransactionPage() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });
    useEffect(() => {}, []);
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
                <div >
                    <DropDownList
                        selection_list={[
                            "Room 1",
                            "Room 2",
                            "Room 3",
                            "Room 4",
                            "Room 1",
                            "Room 1",
                            "Room 1",
                        ]}
                    />
                </div>
            </div>

            <AdminRoomChart />
            <p className="text-white text-4xl font-bold my-6">Transactions</p>
            <AdminRoomTransactionTable />
        </div>
    );
}

export default AdminTransactionPage;
