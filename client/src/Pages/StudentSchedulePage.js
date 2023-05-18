import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Authentication/AuthContext";
import axios from "axios";
import { format } from "date-fns";
import ScheduleTable from "../Components/Table/User/ScheduleTable";
import DatePicker from "../Components/Search/DatePicker.js";
import SortAccordion from "../Components/Search/SortAccordion";
import FilterSortAccordion from "../Components/Search/FilterSortAccordion";
import { TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";

function StudentSchedulePage() {
    const [date, setDate] = useState({ date: new Date() });
    const [search, setSearch] = useState("");
    const [schedule, setSchedule] = useState([]);
    const { token } = useContext(AuthContext);
    useEffect(() => {
        getSchedule();
    }, [date]);

    const filter = (name) => {
        if (search === "") {
            return true;
        }
        if (name.toLowerCase().includes(search)) {
            return true;
        }
        return false;
    };

    const getSchedule = () => {
        if (token) {
            axios
                .get(
                    `/api/room_details?dateTime=${format(
                        date.date,
                        "yyyy-MM-dd"
                    )}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then((res) => {
                    setSchedule(res.data.rooms);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    console.log(schedule);

    return (
            <div className="flex flex-col w-full justify-center items-center align-middle mt-12">
            	<p className="text-white text-4xl font-bold mb-5 text-left w-full max-w-[85rem] mb-0">Schedule Table</p>
                <div className="mb-3 flex flex-row flex-wrap mt-5 w-full max-w-[85rem] justify-between align-middle gap-2">
                    <DatePicker
                        data={date}
                        setData={setDate}
                        update_key="date"
                        min_date={new Date().getHours() > 17 ? new Date().setDate(new Date().getDate() + 1) : new Date()}
                        className="w-[15rem]"
                        selected={new Date().getHours() > 17 ? new Date().setDate(new Date().getDate() + 1) : new Date()}
                    />
                    <TextInput
                        id="name"
                        type="text"
                        icon={AiOutlineSearch}
                        placeholder="Search by room name"
                        required={true}
                        onChange={(ev) => setSearch(ev.target.value)}
                        className="w-[20rem]"
                    />
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 justify-start w-full max-w-[85rem] mt-3">
                    <div className=" flex flex-row text-white font-semibold gap-3">
                        <div className="w-[5rem] bg-gray-800 h-full border border-gray-500">
                            &nbsp;
                        </div>
                        Available Slot
                    </div>
                    <div className=" flex flex-row text-white font-semibold gap-3">
                        <div className="w-[5rem] bg-gray-500 h-full border border-gray-500">
                            &nbsp;
                        </div>
                        Booked Slot
                    </div>
                    <div className=" flex flex-row text-white font-semibold gap-3">
                        <div className="w-[5rem] bg-green-300 h-full border border-green-400">
                            &nbsp;
                        </div>
                        Your Booking
                    </div>
                </div>
                <div className="w-full max-w-[85rem] overflow-x-auto mt-4">
                    <ScheduleTable
                        date={date.date}
                        schedule={schedule}
                        filter={filter}
                    />
                </div>
            </div>
    );
}

export default StudentSchedulePage;
