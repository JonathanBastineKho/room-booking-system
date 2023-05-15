// Imported Libraries
import {
  Button,
  Label,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { useContext, useState } from "react";
import axios from "axios";

// Imported Local dependencies
import { AuthContext } from "../Authentication/AuthContext";
import DropImageInput from "../Modal/DropImageInput";

function StaffCreateRoomForm(props) {
  const [data, setData] = useState({
    name: null,
    type: "LECTURE_HALL",
    price: null,
    capacity: 2,
    description: null,
    file: null,
  });
  const { token } = useContext(AuthContext);

  const handleUpdate = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      data.name &&
      data.type &&
      data.price &&
      data.capacity &&
      data.description &&
      data.file
    ) {
      var formData = new FormData();
      formData.append("roomName", data.name);
      formData.append("roomType", data.type);
      formData.append("price", data.price);
      formData.append("capacity", data.capacity);
      formData.append("file", data.file);
      formData.append("description", data.description);
      axios
        .post("/api/create_room", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success) {
            props.onClose();
            props.getRooms();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Incomplete data");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-full t-3 px-3">
        <div className="flex flex-row justify-between gap-x-2">
          <div className="flex flex-col w-1/2">
            <div className="mb-2">
              <Label htmlFor="room_name" value="Room name" />
            </div>
            <TextInput
              id="room_name"
              placeholder="Enter room name"
              required={true}
              onBlur={(ev) => {
                if (ev.target.value !== data.name) {
                  handleUpdate("name", ev.target.value);
                }
              }}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="room_type" value="Room type" />
            </div>
            <Select
              id="room_type"
              onChange={(ev) => {
                handleUpdate("type", ev.target.value);
              }}
            >
              <option value="LECTURE_HALL">Lecture Hall</option>
              <option value="MEETING_ROOM">Meeting Room</option>
              <option value="PRIVATE_POD">Private Pod</option>
            </Select>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-x-2">
          <div className="flex flex-col w-1/2">
            <div className="mb-2">
              <Label htmlFor="room_price" value="Pricing (per hour)" />
            </div>
            <TextInput
              id="room_price"
              placeholder="Enter price"
              required={true}
              onBlur={(ev) => {
                if (ev.target.value !== data.price) {
                  handleUpdate("price", ev.target.value);
                }
              }}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="room_cap" value="Capacity" />
            </div>
            <Select
              id="room_cap"
              required={true}
              onChange={(ev) => {
                handleUpdate("capacity", ev.target.value);
              }}
              value={data.capacity}
            >
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </Select>
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="room_desc" value="Description" />
          </div>
          <Textarea
            id="room_desc"
            placeholder="Enter room description"
            onBlur={(ev) => {
              if (ev.target.value !== data.description) {
                handleUpdate("description", ev.target.value);
              }
            }}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="room_img" value="Room Image" />
          </div>
          <DropImageInput
            show={props.show}
            file={data.file}
            setFile={(val) => handleUpdate("file", val)}
          />
        </div>
        <Button className="mt-2 rounded-lg" size={"lg"} onClick={handleSubmit}>
          Add Room
        </Button>
      </div>
    </form>
  );
}

export default StaffCreateRoomForm;
