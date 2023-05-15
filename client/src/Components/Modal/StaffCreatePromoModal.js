// Imported Libraries
import { Modal } from "flowbite-react";
import React from "react";

// Imported Local dependencies
import StaffCreatePromoForm from "../Forms/StaffCreatePromoForm";

function StaffCreatePromoModal(props) {
  return (
    <Modal show={props.show} size="xl" popup={false} onClose={props.onClose}>
      <div className="bg-gray-800 rounded-lg">
        <Modal.Header>
          <div className="font-bold text-3xl p-2 px-5 pb-0">Add Promo Code</div>
        </Modal.Header>
        <Modal.Body>
          <StaffCreatePromoForm
            onClose={props.onClose}
            getPromos={props.getPromos}
          />
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default StaffCreatePromoModal;
