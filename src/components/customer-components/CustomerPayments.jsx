/*eslint-disable*/
import React from "react";
import TableComponent from "../tableComponenet/TableComponent";
import { IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import { routes } from "../../helpers/routesHelper";

let headCells = [
  { id: "SR", numeric: true, disablePadding: true, label: "ID" },
  {
    id: "fullName",
    numeric: false,
    disablePadding: true,
    label: "Full Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "bookingId",
    numeric: false,
    disablePadding: true,
    label: "Booking ID",
  },
  {
    id: "paymentAmount",
    numeric: false,
    disablePadding: true,
    label: "Amount",
  },
  {
    id: "payment",
    numeric: false,
    disablePadding: true,
    label: "Payment",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "Created At",
  },
];

const CustomerPayments = () => {
  const customerId = JSON.parse(localStorage.getItem("customerDetails"))._id;

  return (
    <TableComponent
      modalObject={{
        title: "Payment Details",
      }}
      buttonObject={{
        uppercase: true,
        size: "sm",
        title: "Add Booking",
        icon: <IconPlus size={20} />,
        iconPosition: "right",
        hidden: true,
      }}
      headCells={headCells}
      getDataApiURI={`customer/get-customer-payments/${customerId}`}
    />
  );
};

export default CustomerPayments;
