import React, { useState } from "react";
import {
  Card,
  Label,
  TextInput,
  Checkbox,
  Button,
  Toast,
} from "flowbite-react";

function RoomCard() {
  // assuming we get a roomName passed from
  // component above
  const getRoomJson = (roomName) => {
    // get room object based on id
    // TBD
    // assume this is returned by api call
    const roomJson = {
      name: "The backrooms",
      imgUrl:
        "https://th.bing.com/th/id/OIP.mu-g99bDuvFB-YWfvGxY4QHaE6?pid=ImgDet&rs=1",
      roomType: "Private Meeting Room",
      price: 5,
      capacity: 10,
      description: "A private meeting room located at SIM HQ Blk B Level 1.",
      isLaunched: "yes",
      launchDateTime: "some datetime obj",
      isApproved: "yes",
      approvedDateTime: "some datetime obj",
    };
    return roomJson;
  };

  const roomJson = getRoomJson("my roomName");

  return (
    <div className="max-w-sm">
      <Card imgSrc={roomJson.imgUrl}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {roomJson.name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Type: {roomJson.roomType}
          <br />
          Capacity: {roomJson.capacity} pax
          <br />
          Pricing: ${roomJson.price}/hour
        </p>
        <Button>
            Read more →
        </Button>
      </Card>
    </div>
  );
}

export default RoomCard;
