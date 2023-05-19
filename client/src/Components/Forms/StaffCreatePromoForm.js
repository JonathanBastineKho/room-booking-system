// Imported Libraries
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import axios from "axios";

// Imported Local dependencies
import { AuthContext } from "../Authentication/AuthContext";
import DatePicker from "../Search/DatePicker";
import { format, isSameDay, setHours } from "date-fns";

function StaffCreatePromoForm(props) {
  const [data, setData] = useState({
    code: null,
    startDate: new Date(),
    startTime: 9,
    endDate: new Date(),
    endTime: 10,
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
      var jsonToSubmit = {
        promoCode: data.code,
        startDate: format(data.startDate, 'yyyy-MM-dd'),
        endDate: format(data.endDate, 'yyyy-MM-dd'),
        discountPercentage: data.discount,
      };
      axios
        .post("/api/create_promo_code", jsonToSubmit, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            props.onClose();
            props.getPromos();
          } else {
            alert("Failed to add promo code.");
          }
        })
        .catch((error) => {
          alert("Failed to add promo code.");
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
          onClick={handleSubmit}
          type="submit"
        >
          Add Promo Code
        </Button>
      </div>
    </form>
  );
}

export default StaffCreatePromoForm;
