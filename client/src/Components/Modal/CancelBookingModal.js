// Imported libraries
import { Button, Modal } from "flowbite-react";
import React from "react";

// Imported icons
import { HiOutlineExclamationCircle } from "react-icons/hi";

function CancelBookingModal(props) {
	return (
		<Modal
			show={props.cancelShow}
			size="md"
			popup={true}
			onClose={() => props.setCancelShow(false)}
		>
			<Modal.Header />
			<Modal.Body>
				<div className="text-center">
					<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
					<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
						Are you sure you want to cancel this booking?
					</h3>
					<div className="flex justify-center gap-4">
						<Button
							color="failure"
							onClick={() => {
								props.cancelBooking(props.name, props.start);
								props.setCancelShow(false);
							}}
						>
							Yes, I'm sure
						</Button>
						<Button color="gray" onClick={() => props.setCancelShow(false)}>
							No, cancel
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default CancelBookingModal;
