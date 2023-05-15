// Imported libraries
import { format } from "date-fns";
import { Button, Table } from "flowbite-react";
import React, { useState } from "react";
import axios from "axios";

// Imported icons
import { FaEdit, FaTrash } from "react-icons/fa";
import StaffModifyPromoModal from "../../Modal/StaffModifyPromoModal";
import DeletePromoModal from "./DeletePromoModal";

function StaffPromoTableRow(props) {
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const deletePromo = (promoCode, startDate, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        promoCode: promoCode,
        startDate: startDate.toISOString().slice(0, 10),
      },
    };

    axios
      .delete("/api/delete_promo_code", config)
      .then((res) => {
        setDeleteShow(false);
        props.getPromos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {props.data.promoCode}
      </Table.Cell>
      <Table.Cell>{format(props.data.startDate, "d MMMM yyyy")}</Table.Cell>
      <Table.Cell>{format(props.data.endDate, "d MMMM yyyy")}</Table.Cell>
      <Table.Cell>{`${props.data.discount}%`}</Table.Cell>
      <Table.Cell>
        <Button
          size="xs"
          className="w-24 py-1"
          onClick={() => setEditShow(true)}
        >
          <FaEdit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </Table.Cell>
      <Table.Cell>
        <Button
          color="red"
          size="xs"
          className="w-24 py-1"
          onClick={() => setDeleteShow(true)}
        >
          <FaTrash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </Table.Cell>
      <StaffModifyPromoModal
        show={editShow}
        onClose={() => setEditShow(false)}
        data={props.data}
        getPromos={props.getPromos}
      />
      <DeletePromoModal
        show={deleteShow}
        onClose={() => setDeleteShow(false)}
        data={props.data}
        deletePromo={deletePromo}
      />
    </Table.Row>
  );
}

export default StaffPromoTableRow;
