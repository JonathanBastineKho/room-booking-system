import React, { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../Components/Authentication/AuthContext";
import StaffRoomTable from "../Components/Table/Staff/StaffRoomTable";
import { AiOutlineSearch } from "react-icons/ai";
import { Button, Spinner, TextInput } from "flowbite-react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import StaffCreateRoomModal from "../Components/Modal/StaffCreateRoomModal";

function StaffRoomsPage() {
    const [filter, setFilter] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [createShow, setCreateShow] = useState(false);

    const { token } = useContext(AuthContext);

    // 		name: "Room 1",
    // 		type: "Meeting Room",
    // 		price: 10,
    // 		capacity: 10,
    // 		description: "Its a meeting room",
    // 		launched: {
    // 			is: true,
    // 			date: new Date(),
    // 		},
    // 	},
    const getRooms = useCallback(() => {
        if (token) {
            axios
                .get("/api/list_of_rooms", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    const temp = [];
                    res.data.rooms.forEach((rows) => {
                        let temp_dict = {
                            name: rows.roomName,
                            type: rows.roomType,
                            price: rows.price,
                            capacity: rows.capacity,
                            description: rows.description,
                            launched: {
                                is: rows.isLaunched,
                                date: new Date(rows.launchDateTime),
                            },
                        };
                        temp.push(temp_dict);
                    });
                    setRooms(temp);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token]);

    useEffect(() => {
        getRooms();
    }, [getRooms]);

    return (
        <div className="mt-12 mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:max-w-[100rem]">
            {rooms ? (
                <div>
                    <p className="text-white text-4xl font-bold my-5">List of Rooms</p>
                    <div className="flex justify-between mb-4">
                            <TextInput
                                className="w-64"
                                id="name"
                                type="text"
                                icon={AiOutlineSearch}
                                placeholder="Search room name"
                                onChange={(ev) => setFilter(ev.target.value)}
                            />
                        <div className="flex justify-end">
                            <Button
                                type="button"
                                onClick={() => setCreateShow(true)}
                            >
                              <AiOutlinePlus  className="mr-2"/>
                                Add Room
                            </Button>
                        </div>
                    </div>
                    <StaffRoomTable
                        hoverable={false}
                        className="mb-10"
                        rooms_data={rooms}
                        getRooms={getRooms}
                        filter={filter}
                    />
                    <StaffCreateRoomModal
                        show={createShow}
                        onClose={() => setCreateShow(false)}
                        getRooms={getRooms}
                    />
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    );
}

export default StaffRoomsPage;
