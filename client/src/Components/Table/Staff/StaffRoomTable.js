// Imported Libraries
import { Table } from "flowbite-react";
import React from "react";

// Imported local dependencies
import StaffRoomTableRow from "./StaffRoomTableRow";

function StaffRoomTable(props) {
  // Dummy data -> change with props.data which will be extracted from API.
  // const data = [
  // 	{
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
  // 	{
  // 		name: "Room 2",
  // 		type: "Meeting Room",
  // 		price: 10,
  // 		capacity: 10,
  // 		description:
  // 			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  // 		launched: {
  // 			is: false,
  // 			date: null,
  // 		},
  // 	},
  // ];
  return (
    <div>
      <Table hoverable={props.hoverable} className={props.className}>
        <Table.Head>
          <Table.HeadCell>Room name</Table.HeadCell>
          <Table.HeadCell>Room type</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Capacity</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Launched</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Delete</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {props.rooms_data
            .filter(
              (value) =>
                !props.filter ||
                value.name.toLowerCase().startsWith(props.filter.toLowerCase())
            )
            .map((value) => (
              <StaffRoomTableRow data={value} getRooms={props.getRooms} />
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default StaffRoomTable;
