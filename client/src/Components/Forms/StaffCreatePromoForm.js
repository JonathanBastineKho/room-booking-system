// Imported Libraries
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import axios from "axios";

// Imported Local dependencies
import { AuthContext } from "../Authentication/AuthContext";
import DatePicker from "../Search/DatePicker";
import { format, isSameDay, setHours } from "date-fns";

function StaffCreatePromoForm() {
  const [data, setData] = useState({
    code: null,
    startDate: new Date(),
    startTime: null,
    endDate: new Date(),
    endTime: null,
    discount: 2,
  });
  const { token } = useContext(AuthContext);

  const endTimeSlots = [];
  for (let index = 10; index < 19; index++) {
    const time = format(setHours(new Date(), index), "h:00aaa");
    endTimeSlots.push(
      <option
        value={index}
        disabled={
          isSameDay(data.startDate, data.endDate)
            ? index <= data.startTime
            : false
        }
      >
        {time}
      </option>
    );
  }

  const handleUpdate = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      data.code &&
      data.startDate &&
      data.startTime &&
      data.endDate &&
      data.endTime &&
      data.discount
    ) {
      // var formData = new FormData();
      // formData.append("code", data.name);
      // formData.append(
      // 	"start",
      // 	format(setHours(data.startDate, data.startTime), "yyyy-MM-dd HH")
      // );
      // formData.append(
      // 	"end",
      // 	format(setHours(data.endDate, data.endTime), "yyyy-MM-dd HH")
      // );
      // formData.append("discount", data.capacity);
      // axios
      // 	.post("/api/create_room", formData, {
      // 		headers: {
      // 			Authorization: `Bearer ${token}`,
      // 			"Content-Type": "multipart/form-data",
      // 		},
      // 	})
      // 	.then((res) => {
      // 		if (res.data.success) {
      // 			props.onClose();
      // 		} else {
      // 			alert("Failed to add promo code.");
      // 		}
      // 	})
      // 	.catch((error) => {
      // 		alert("Failed to add promo code.");
      // 		console.log(error);
      // 	});
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
            <Label htmlFor="promocode" value="Promo code" />
          </div>
          <TextInput
            id="promocode"
            placeholder="Enter promo code"
            required={true}
            onBlur={(ev) => {
              if (ev.target.value !== data.code) {
                handleUpdate("code", ev.target.value);
              }
            }}
          />
        </div>
        <div className="flex flex-col w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="discount" value="Discount (percentage)" />
          </div>
          <TextInput
            id="discount"
            placeholder="Enter discount 1-100"
            required={true}
            onBlur={(ev) => {
              if (ev.target.value !== data.discount) {
                handleUpdate("discount", ev.target.value);
              }
            }}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between gap-x-2">
        <div className="flex flex-col w-1/2">
          <div className="mb-2">
            <Label htmlFor="date" value="Start date" />
          </div>
          <DatePicker
            id="date"
            data={data}
            setData={setData}
            update_key="startDate"
            min_date={new Date()}
            className=""
          />
        </div>
        <div className="flex flex-col w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="starttime" value="Start time" />
          </div>
          <Select
            id="starttime"
            required={true}
            onChange={(ev) => {
              handleUpdate("startTime", ev.target.value);
              handleUpdate("endTime", ev.target.value + 1);
            }}
            value={data.startTime}
          >
            <option value={9}>9:00am</option>
            <option value={10}>10:00am</option>
            <option value={11}>11:00am</option>
            <option value={12}>12:00pm</option>
            <option value={13}>1:00pm</option>
            <option value={14}>2:00pm</option>
            <option value={15}>3:00pm</option>
            <option value={16}>4:00pm</option>
            <option value={17}>5:00pm</option>
          </Select>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-x-2">
        <div className="flex flex-col w-1/2">
          <div className="mb-2">
            <Label htmlFor="enddate" value="End date" />
          </div>
          <DatePicker
            id="enddate"
            data={data}
            setData={setData}
            update_key="endDate"
            min_date={data.startDate}
            className=""
          />
        </div>
        <div className="flex flex-col w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="endtime" value="End time" />
          </div>
          <Select
            id="endtime"
            required={true}
            onChange={(ev) => {
              handleUpdate("endTime", ev.target.value);
            }}
            value={data.endTime}
          >
            {endTimeSlots}
          </Select>
        </div>
      </div>
      <Button className="mt-2 rounded-lg" size={"lg"} onClick={handleSubmit} type="submit">
        Add Promo Code
      </Button>
    </div>
    </form>
  );
}

export default StaffCreatePromoForm;
