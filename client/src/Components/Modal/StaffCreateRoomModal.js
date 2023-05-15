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
import DropImageInput from "./DropImageInput";
import { AuthContext } from "../Authentication/AuthContext";
import StaffCreateRoomForm from "../Forms/StaffCreateRoomForm";

function StaffCreateRoomModal(props) {
  return (
    <Modal show={props.show} size="xl" popup={false} onClose={props.onClose}>
      <div className="bg-gray-800 rounded-lg">
        <Modal.Header>
          <div className="font-bold text-3xl p-2 px-5 pb-0">Add Room</div>
        </Modal.Header>
        <Modal.Body>
          <StaffCreateRoomForm
            show={props.show}
            onClose={props.onClose}
            getRooms={props.getRooms}
          />
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default StaffCreateRoomModal;
