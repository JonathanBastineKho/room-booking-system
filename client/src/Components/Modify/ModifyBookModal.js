import { Modal, Button, Dropdown, Select, Toast } from "flowbite-react";
import React, { useState, useEffect } from "react";
import DatePicker from "../Search/DatePicker";
import { format, setHours } from "date-fns";
import { HiX } from "react-icons/hi";

function ModifyBookModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState({
    // default value is date passed from parent
    date: null,
  });
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [timeSlots, setTimeSlots] = useState([]);
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  // API CALL
  const getRoomJson = (roomName) => {
    // get room object based on name
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

  // query for json of room based on name
  var roomJson = getRoomJson("my roomName");

  // API CALL
  const getTimeSlots = (roomName, date) => {
    // get slots based on roomName, date
    // 1 for booked, 0 for available
    // assume these times available: [9, 11, 13, 14, 16, 17]
    // unavailable: [10, 12, 15]
    return [0, 1, 0, 1, 0, 0, 1, 0, 0];
  };

  var endSlots = [];
  let endFlag = false;
  // start time range is 0-9, endtime range is 1-10,
  for (let index = 0; index < 9; index++) {
    if (index < startTime || endFlag) {
      endSlots.push(1);
    } else if (timeSlots[index] == 1) {
      endSlots.push(1);
      endFlag = true;
    } else {
      endSlots.push(0);
    }
  }

  // TODO: check that theyre not trying to book for a longer timeslot than original booking

  // do getRoomJson and getTimeSlots again
  // watch when booking date changes
  useEffect(() => {
    setTimeSlots(getTimeSlots("my roomName", new Date()));
  }, [date]);

  const setNewStartTime = (ev) => {
    setStartTime(ev.currentTarget.value);
    setEndTime(ev.currentTarget.value);
  };

  // API CALL
  const getBookingJson = (roomName) => {
    const bookingJson = {
      name: "The backrooms",
      startDateTime: new Date("2023-04-20 09:00:00"),
      endDateTime: new Date("2023-04-20 12:00:00"),
      userName: "edkesuma",
    };
    return bookingJson;
  };

  const bookingJson = getBookingJson(roomJson.name);
  const initialBookingDuration =
    bookingJson.endDateTime.getHours() - bookingJson.startDateTime.getHours();

  const checkDuration = () => {
    var startHour = startTime.getHours();
    var endHour = endTime.getHours();
    if (endHour - startHour > initialBookingDuration) {
    } else {
      handleClose();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}> Open Modal </Button>
      <Modal
        show={isOpen}
        size="lg"
        onClose={handleClose}
        dismissible={true}
        popup={true}
      >
        <div className="bg-gray-800 rounded-lg">
          <Modal.Header />
          <Modal.Body>
            <img
              src={roomJson.imgUrl}
              alt="Example Image"
              className="mb-2 rounded-lg"
            />
            <div className="text-left p-4">
              <div className="mb-4">
                <h5 className="text-3xl font-bold tracking-tight text-white">
                  {roomJson.name}
                </h5>
                <h3 className="mb-5 text-sm font-bold text-gray-400 dark:text-gray-400">
                  {roomJson.description}
                </h3>
                <span className="text-gray-100 text-md font-semibold">
                  Current Booking
                </span>
                <p className="font-normal text-gray-400 text-sm">
                  Booking Date:{" "}
                  {bookingJson.startDateTime.getUTCDate() +
                    " " +
                    MONTHS[bookingJson.startDateTime.getUTCMonth()] +
                    " " +
                    bookingJson.startDateTime.getUTCFullYear()}
                  <br />
                  Start time:{" "}
                  {format(
                    setHours(new Date(), bookingJson.startDateTime.getHours()),
                    "h:00aaa"
                  )}{" "}
                  <br />
                  End time:{" "}
                  {format(
                    setHours(new Date(), bookingJson.endDateTime.getHours()),
                    "h:00aaa"
                  )}
                </p>
              </div>

              <div className="mb-5">
                <div className="flex items-center font-normal text-white text-md mb-3">
                  <div className="mr-5 w-36">
                    <p>Booking date:</p>
                  </div>
                  <DatePicker
                    id="date"
                    data={date}
                    setData={setDate}
                    update_key="date"
                    min_date={new Date()}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center font-normal text-white text-md justify-between">
                  <div className="flex flex-row">
                    <div className="flex mr-5 items-center">Start time:</div>
                    <Select
                      value={startTime}
                      id="startTime"
                      required={true}
                      onChange={(event) => setNewStartTime(event)}
                    >
                      {timeSlots.map((slot, index) => {
                        var time = index + 9;
                        // convert list to readable time slots (09:00)
                        // var timeString = time < 10 ? `0${time}:00` : `${time}:00`;
                        var timeString = format(
                          setHours(new Date(), time),
                          "h:00aaa"
                        );
                        return (
                          <option value={index} disabled={slot == 1}>
                            {timeString}
                          </option>
                        );
                      })}
                      ;
                    </Select>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex items-center mr-3">
                      <p>End time: </p>
                    </div>
                    <div className="flex items-center">
                      <Select
                        value={endTime}
                        id="endTime"
                        required={true}
                        onChange={(event) => setEndTime(event.target.value)}
                      >
                        {endSlots.map((slot, index) => {
                          var time = index + 10;
                          // convert list to readable time slots (09:00)
                          // var timeString = time < 10 ? `0${time}:00` : `${time}:00`;
                          var timeString = format(
                            setHours(new Date(), time),
                            "h:00aaa"
                          );
                          return (
                            <option
                              value={index}
                              disabled={slot == 1 || time <= startTime}
                            >
                              {timeString}
                            </option>
                          );
                        })}
                        ;
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button className="w-full" onClick={handleClose}>
                  Modify
                </Button>
              </div>
              <Toast className="w-11/12">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                  <HiX className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">
                  Can't book for more than {initialBookingDuration} hours.
                </div>
                <Toast.Toggle />
              </Toast>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
}

export default ModifyBookModal;
