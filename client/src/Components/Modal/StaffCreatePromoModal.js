// Imported Libraries
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import axios from "axios";

// Imported Local dependencies
import { AuthContext } from "../Authentication/AuthContext";
import DatePicker from "../Search/DatePicker";
import { format, isSameDay, setHours } from "date-fns";
import StaffCreatePromoForm from "../Forms/StaffCreatePromoForm";

function StaffCreatePromoModal(props) {
	

	return (
		<Modal show={props.show} size="xl" popup={false} onClose={props.onClose}>
			<div className="bg-gray-800 rounded-lg">
				<Modal.Header>
					<div className="font-bold text-3xl p-2 px-5 pb-0">
						Add Promo Code
					</div>
				</Modal.Header>
				<Modal.Body>
					<StaffCreatePromoForm />
				</Modal.Body>
			</div>
		</Modal>
	);
}

export default StaffCreatePromoModal;
