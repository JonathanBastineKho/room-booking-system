// Imported Libraries
import { Modal } from "flowbite-react";
import React, { useState } from "react";

// Imported Local dependencies
import StaffModifyPromoForm from "../Forms/StaffModifyPromoForm";

function StaffModifyPromoModal(props) {
  // {
  // 	code: null,
  // 	startDate: new Date(),
  // 	startTime: null,
  // 	endDate: new Date(),
  // 	endTime: null,
  // 	discount: 2,
  // }
  const [data, setData] = useState(props.data);

  return (
    <Modal show={props.show} size="xl" popup={false} onClose={props.onClose}>
      <div className="bg-gray-800 rounded-lg">
        <Modal.Header>
          <div className="font-bold text-3xl p-2 px-5 pb-0">
            Modify Promo Code
          </div>
        </Modal.Header>
        <Modal.Body>
          <StaffModifyPromoForm
            data={data}
            onClose={props.onClose}
            getPromos={props.getPromos}
          />
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default StaffModifyPromoModal;
