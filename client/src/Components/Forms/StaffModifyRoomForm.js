import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";

import { AuthContext } from "../Authentication/AuthContext";
import React, { useContext, useState } from "react";
import DropImageInput from "../Modal/DropImageInput";

function StaffModifyRoomForm(props) {

    // {
	// 	name: null,
	// 	type: null,
	// 	price: null,
	// 	capacity: 2,
	// 	description: null,
	// 	file: null,
	// }
	const [data, setData] = useState(props.data);
	const { token } = useContext(AuthContext);

    const handleUpdate = (key, value) => {
		setData((prev) => ({ ...prev, [key]: value }));
	};

	const handleModify = (event) => {
		// console.log("name:", data.name)
		// console.log("file:", data.file)
		// if (
		// 	data.name &&
		// 	data.type &&
		// 	data.price &&
		// 	data.capacity &&
		// 	data.description &&
		// 	data.file
		// ) {
		// 	var formData = new FormData();
		// 	formData.append("roomName", data.name);
		// 	formData.append("roomType", data.type);
		// 	formData.append("price", data.price);
		// 	formData.append("capacity", data.capacity);
		// 	formData.append("file", data.file);
		// 	// axios
		// 	// 	.post("/api/modify_room", formData, {
		// 	// 		headers: {
		// 	// 			Authorization: `Bearer ${token}`,
		// 	// 			"Content-Type": "multipart/form-data",
		// 	// 		},
		// 	// 	})
		// 	// 	.then((res) => {
		// 	// 		if (res.data.success) {
		// 	// 			props.onClose();
        //  //                props.getRooms();
		// 	// 		} else {
		// 	// 			alert("Failed to modify room.");
		// 	// 		}
		// 	// 	})
		// 	// 	.catch((error) => {
		// 	// 		alert("Failed to add room.");
		// 	// 		console.log(error);
		// 	// 	});
		// } else {
		// 	alert("Incomplete data");
		// }
		// console.log(data)
		event.preventDefault();
		// alert(data);
        console.log(data);
        props.onClose();
	};
  return (
    <form onSubmit={handleModify}>
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
              defaultValue={data.name}
              onChange={(ev) => {
                if (ev.target.value !== data.name) {
                  handleUpdate("name", ev.target.value);
                  // setData((prev) => ({ ...prev, ["name"]: ev.target.value }));
                }
              }}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="room_type" value="Room type" />
            </div>
            <TextInput
              id="room_type"
              placeholder="Enter room type"
              required={true}
              defaultValue={data.type}
              onChange={(ev) => {
                if (ev.target.value !== data.type) {
                  handleUpdate("type", ev.target.value);
                }
              }}
            />
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
              defaultValue={data.price}
              onChange={(ev) => {
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
            defaultValue={data.description}
            onChange={(ev) => {
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
            file={data.file}
            setFile={(val) => handleUpdate("file", val)}
          />
        </div>
        <Button
          className="mt-2 rounded-lg"
          size={"lg"}
          onClick={handleModify}
          type="submit"
        >
          Modify Room
        </Button>
      </div>
    </form>
  );
}

export default StaffModifyRoomForm;
