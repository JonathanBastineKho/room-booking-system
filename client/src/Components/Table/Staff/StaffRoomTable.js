// Imported Libraries
import { Table, Modal, Button } from "flowbite-react";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { HiOutlineExclamationCircle } from "react-icons/hi";

// Imported local dependencies
import StaffRoomTableRow from "./StaffRoomTableRow";
import { AuthContext } from "../../Authentication/AuthContext";

function StaffRoomTable(props) {
  const { token } = useContext(AuthContext);
  const [isModalShow, setIsModalShow] = useState(false);

  // addRoom() {
  // 	// call api - getRooms
  // 	// setrooms
  // }

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
  // const data = props.rooms_data;

  

  // Dummy edit -> change with API
  const editRoom = (name) => {
    console.log("edit", name);
  };

//   const launchRoom = (name) => {
//     console.log("launch", name);
//   };

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
		  .filter((value) => !props.filter || value.name.toLowerCase().startsWith(props.filter.toLowerCase()))
		  .map((value) => (
            <StaffRoomTableRow
              data={value}
              editRoom={editRoom}
			  getRooms={props.getRooms}
            />
          ))}
        </Table.Body>
      </Table>
      {/* <Modal
        show={isModalShow}
        size="md"
        popup={true}
        onClose={setIsModalShow(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete the room?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteRoom}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={setIsModalShow(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}
    </div>
  );
}

export default StaffRoomTable;
