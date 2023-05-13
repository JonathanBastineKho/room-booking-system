import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Components/Authentication/AuthContext";
import StaffRoomTable from "../Components/Table/Staff/StaffRoomTable";
import { AiOutlineSearch } from "react-icons/ai";
import { Button, Card, Label, Modal, Spinner, TextInput } from "flowbite-react";
import axios from "axios";


function StaffRoomsPage() {
  const [filter, setFilter] = useState(null);
  const [rooms, setRooms] = useState(null);
  
  const { token } = useContext(AuthContext);

  useEffect(() => {
    getRooms();
  }, []);
  // useEffect(() => {
  //   console.log(filter)
  // }, [filter])

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
  const getRooms = () => {
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
          console.log(temp);
          setRooms(temp);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  console.log(token);

  // useEffect(() => {
  //   console.log("filter: " + filter);
  // }, [filter])

  return (
    <div>
      {rooms ? (
        <Card>
          <Label htmlFor="name" value="Search Room Name" />
          <div className="flex justify-between mb-5">
            <div className="w-2/5">
              <TextInput
                id="name"
                type="text"
                icon={AiOutlineSearch}
                placeholder="Search room name"
                onChange={(ev) => setFilter(ev.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button type="button">
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
          
        </Card>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default StaffRoomsPage;
