// Imported Libraries
import { Modal } from "flowbite-react";
import React from "react";

// Imported Local dependencies
import StaffModifyRoomForm from "../Forms/StaffModifyRoomForm";

function StaffModifyRoomModal(props) {
  // {
  // 	name: null,
  // 	type: null,
  // 	price: null,
  // 	capacity: 2,
  // 	description: null,
  // 	file: null,
  // }
  return (
    <Modal show={props.show} size="xl" popup={false} onClose={props.onClose}>
      <div className="bg-gray-800 rounded-lg">
        <Modal.Header>
          <div className="font-bold text-3xl p-2 px-5 pb-0">Modify Room</div>
        </Modal.Header>
        <Modal.Body>
          <StaffModifyRoomForm
            data={props.data}
            onClose={props.onClose}
            show={props.show}
            getRooms={props.getRooms}
          />
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default StaffModifyRoomModal;
