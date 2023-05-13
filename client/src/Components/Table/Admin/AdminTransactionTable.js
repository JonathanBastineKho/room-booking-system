// Imported Libraries
import { Table } from "flowbite-react";
import React, { useState } from "react";

// Imported local dependencies
import AdminTransactionTableRow from "./AdminTransactionTableRow";

function AdminTransactionTable(props) {
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
                    {props.display.length !== 0 &&
                        props.display.map((value, index) => (
                            <AdminTransactionTableRow
                                data={value}
                                key={index}
                            />
                        ))}
                    {props.display.length === 0 && (
                        <Table.Row className="h-20 bg-gray-800">
                            <Table.Cell
                                colSpan={5}
                                className="w-full text-center"
                            >
                                <span className="text-lg font-semibold">There is no Transaction</span>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    );
}

export default AdminTransactionTable;
