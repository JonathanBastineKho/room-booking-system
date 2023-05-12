// Imported Libraries
import axios from "axios";
import { Table } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthContext";
import { Spinner } from "flowbite-react";

// Imported local dependencies
import AdminRoomTableRow from "./AdminRoomTableRow";

function AdminRoomTable(props) {
    const { token } = useContext(AuthContext);
    // Dummy data -> change with props.data which will be extracted from API.
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = () => {
        axios
            .get("/api/list_of_rooms", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setData(res.data.rooms);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log("getdata");
    };

    // Dummy approve -> change with APi
    const approveRoom = async (name) => {
        console.log("approve", name);
        await axios.patch(
            "/api/approve_room",
            {
                roomName: name,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        getData();
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="overflow-x-auto">
            <Table hoverable={props.hoverable}>
                <Table.Head>
                    <Table.HeadCell>Room name</Table.HeadCell>
                    <Table.HeadCell>Room type</Table.HeadCell>
                    <Table.HeadCell>Price / Hr </Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Approve</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {isLoading && (
                        <div className="my-8">
                            <Spinner
                                size="xl"
                                aria-label="Center-aligned spinner example"
                            />
                        </div>
                    )}
                    {!isLoading && data.length == 0 && <p>There is no room</p>}
                    {!isLoading &&
                        data.map((value, index) => (
                            <AdminRoomTableRow
                                data={value}
                                approveRoom={approveRoom}
                                key={index}
                            />
                        ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default AdminRoomTable;
