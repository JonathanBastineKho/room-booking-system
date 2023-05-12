import React from "react";
import { Card, Footer } from "flowbite-react";

export function BookingSummaryCard() {
  return (
    <div className="">
      <Card href="#" className="w-96 h-1/4  rounded ">
        <div className="flex flex-col">
          <span className="font-bold text-4xl text-white text-center">
            Booking Summary
          </span>{" "}
          <br />
          <div className="flex items-center justify-center mb-3">
            <img
              className="h-26"
              src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Backrooms_model.jpg"
            ></img>
          </div>
          <span className="font-bold text-2xl text-white text-center">
            {"The Backrooms"}
          </span>
          <span className="text-gray text-xs text-zinc-400 font-bold text-center align-middle px-2">
            {"A private meeting room located at SIM HQ Blk B"}
          </span>
        </div>
        <div className="flex flex-col gap-1 font-bold border-t-2 border-white pt-4 ">
          <div className="flex w-full justify-between">
            <span className="text-white">Date </span> <span className="text-zinc-400">{"Thursday, 20 April 2023"}</span>
          </div>
          <div className="flex flex-row w-full justify-between">
            <span className="text-white">Time </span> <span className="text-zinc-400">{"09:00 AM - 12:00 PM"} </span>
          </div>
          <div className="flex flex-row w-full justify-between">
          <span className="text-white">Capacity </span> <span  className="text-zinc-400">{"10 pax"} </span>
          </div>
          <div className="flex flex-row w-full justify-between">
          <span className="text-white">Pricing </span> <span className="text-zinc-400">{"$5/hour"}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default BookingSummaryCard;
