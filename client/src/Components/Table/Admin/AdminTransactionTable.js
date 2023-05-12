// Imported Libraries
import { Table } from "flowbite-react";
import React, { useState } from "react";

// Imported local dependencies
import AdminTransactionTableRow from "./AdminTransactionTableRow";

function AdminTransactionTable(props) {
    const display =
        props.selected_room === "All rooms"
            ? props.data
            : props.data.filter(
                  (item) => item.roomName === props.selected_room
              );
    return (
        <div className="overflow-x-auto">
            <Table hoverable={props.hoverable}>
                <Table.Head>
                    <Table.HeadCell>Room name</Table.HeadCell>
                    <Table.HeadCell>User</Table.HeadCell>
                    <Table.HeadCell>Booking Date</Table.HeadCell>
                    <Table.HeadCell>Booking Time</Table.HeadCell>
                    <Table.HeadCell>Fee</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {display.map((value, index) => (
                        <AdminTransactionTableRow data={value} key={index} />
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default AdminTransactionTable;
