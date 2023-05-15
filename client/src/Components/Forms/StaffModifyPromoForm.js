// Imported Libraries
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import axios from "axios";

// Imported Local dependencies
import DatePicker from "../Search/DatePicker";
import { format, isSameDay, setHours } from "date-fns";
import { AuthContext } from "../Authentication/AuthContext";

function StaffModifyPromoForm(props) {
  // {
  // 	code: null,
  // 	startDate: new Date(),
  // 	startTime: null,
  // 	endDate: new Date(),
  // 	endTime: null,
  // 	discount: 2,
  // }
  const [data, setData] = useState(props.data);
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
  const handleModify = (event) => {
    if (data.promoCode && data.startDate && data.endDate && data.discount) {
      const jsonToSubmit = {
        promoCode: props.data.promoCode,
        startDate: props.data.startDate.toISOString().slice(0, 10),
        newstartDate: data.startDate.toISOString().slice(0, 10),
        newendDate: data.endDate.toISOString().slice(0, 10),
        discountPercentage: data.discount,
        newPromoCode: data.promoCode,
      };
      console.log("data", data)
      console.log("json", jsonToSubmit)
      axios
        .patch("/api/modify_promo_code", jsonToSubmit, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.success) {
            console.log("successful api call")
            props.onClose();
            props.getPromos();
          } else {
            alert("Failed to edit promo code.");
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
    <form onSubmit={handleModify}>
      <div className="flex flex-col gap-4 w-full t-3 px-3">
        <div className="flex flex-row justify-between gap-x-2">
          <div className="flex flex-col w-1/2">
            <div className="mb-2">
              <Label htmlFor="promocode" value="Promo code" />
            </div>
            <TextInput
              id="promocode"
              placeholder="Enter promo code"
              defaultValue={data.promoCode}
              required={true}
              onChange={(ev) => {
                if (ev.target.value !== data.promoCode) {
                  handleUpdate("promoCode", ev.target.value);
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
              defaultValue={data.discount}
              onChange={(ev) => {
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
        </div>
        <Button
          className="mt-2 rounded-lg"
          size={"lg"}
          onClick={handleModify}
          type="submit"
        >
          Modify Promo Code
        </Button>
      </div>
    </form>
  );
}

export default StaffModifyPromoForm;
