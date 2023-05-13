import { Button, Modal } from "flowbite-react";
import React, { useContext } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { AuthContext } from "../../Authentication/AuthContext";


function DeleteRoomModal(props) {
    const { token } = useContext(AuthContext);

  return (
    <div>
      <Modal
        show={props.show}
        size="md"
        popup={true}
        onClose={props.onClose}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete the room?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => props.deleteRoom(props.data.name, token)}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={props.onClose}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DeleteRoomModal;
