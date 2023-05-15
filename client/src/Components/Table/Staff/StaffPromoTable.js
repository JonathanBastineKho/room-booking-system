// Imported Libraries
import { Table } from "flowbite-react";
import React from "react";

// Imported local dependencies
import StaffPromoTableRow from "./StaffPromoTableRow";

function StaffPromoTable(props) {
  return (
    <Table hoverable={props.hoverable}>
      <Table.Head>
        <Table.HeadCell>Promo Code</Table.HeadCell>
        <Table.HeadCell>Start Date</Table.HeadCell>
        <Table.HeadCell>End Date</Table.HeadCell>
        <Table.HeadCell>Discount</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Delete</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {props.data
          .filter(
            (value) =>
              !props.filter ||
              value.promoCode
                .toLowerCase()
                .startsWith(props.filter.toLowerCase())
          )
          .map((value) => (
            <StaffPromoTableRow data={value} getPromos={props.getPromos} />
          ))}
      </Table.Body>
    </Table>
  );
}

export default StaffPromoTable;
