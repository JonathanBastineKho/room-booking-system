import React from "react";
import { Card } from "flowbite-react";
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { format, setHours } from "date-fns";

export function SuccessfulPaymentCard(props) {


  const booking = {
    name : "Backrooms",
    startDateTime: new Date("April 20, 2023 09:00:00"),
    endDateTime:  new Date("April 20, 2023 12:00:00"),
    userName: "User1"
  }

  
  const month = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]

  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }

  const dateSyntax = (dateObject) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const dayOfWeek = daysOfWeek[dateObject.getDay()];
    const dayOfMonth = dateObject.getDate();
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();
  
    return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
  };


 
  const timeSyntax = (dateObject) =>{ // this const is not used 
    let h = addZero(dateObject.getHours());
    let m = addZero(dateObject.getMinutes());
    let time = h + ":" + m;
    return (time)
  }
  return (
    <div>
      <Card className="w-96 rounded-lg">
        <div className="text-center text-white font-bold text-2xl pb-0 ">
          <span>Payment Approved</span>
        </div>
        <div className="flex justify-center items-center">
          <IoMdCheckmarkCircleOutline size={50} color="white"/>
        </div>
        <div className="flex flex-col gap-0 font-bold text-center text-white text-xl ">
          <div>
            <span>{props.booking.name} booked for </span>
          </div>
          <div>
            <span>{dateSyntax(props.booking.startDateTime)} </span>
          </div>
          <div>
            <span>
              {format(setHours(new Date(), props.booking.startDateTime.getHours()), "h:00 aaa")} to {format(setHours(new Date(), props.booking.endDateTime.getHours()), "h:00 aaa")}
            </span>
           
          </div>
          
          
        </div>
      </Card>
    </div>
  );
}

export default SuccessfulPaymentCard;
