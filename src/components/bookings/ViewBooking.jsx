import { routes } from "../../helpers/routesHelper";
import TableComponent from "../tableComponenet/TableComponent";
import { IconEye, IconPlus, IconTrash } from "@tabler/icons-react";

let headCells = [
  { id: "SR", numeric: true, disablePadding: true, label: "ID" },
  {
    id: "bookingCity",
    numeric: false,
    disablePadding: true,
    label: "City",
  },
  {
    id: "bookingZip",
    numeric: false,
    disablePadding: true,
    label: "ZIP",
  },
  {
    id: "bookingId",
    numeric: false,
    disablePadding: true,
    label: "Booking ID",
  },
  {
    id: "bookingEmailAddress",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "bookingContactNumber",
    numeric: false,
    disablePadding: true,
    label: "Contact",
  },
  // {
  //   id: "packageTitle",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "Package",
  // },
  // {
  //   id: "serviceTitle",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "Service",
  // },
  {
    id: "bookingDescription",
    numeric: false,
    disablePadding: true,
    label: "Desc",
  },

  {
    id: "bookingPrice",
    date: false,
    numeric: true,
    disablePadding: true,
    label: "Total",
  },
  {
    id: "bookingPaidAmount",
    date: false,
    numeric: true,
    disablePadding: true,
    label: "Paid",
  },
  {
    id: "bookingRemainingAmount",
    date: false,
    numeric: true,
    disablePadding: true,
    label: "Remaining",
  },
  {
    id: "bookingPaymentStatus",
    date: false,
    numeric: true,
    disablePadding: true,
    label: "Status",
  },
  {
    id: "bookingPaymentStatus",
    date: false,
    numeric: true,
    disablePadding: true,
    label: "Payment Status",
  },
  {
    id: "bookingDate",
    date: true,
    numeric: false,
    disablePadding: true,
    label: "Booking At",
  },
  {
    id: "createdAt",
    date: true,
    numeric: false,
    disablePadding: true,
    label: "Created At",
  },
  {
    id: "actions",
    view: { icon: <IconEye /> },
    delete: { icon: <IconTrash />, deleteURI: "admin/deleteBooking" },
    numeric: false,
    label: "Actions",
  },
  // { id: "action", numeric: false, disablePadding: true, label: "Action" },
];
const ViewBooking = () => {
  return (
    <TableComponent
      modalObject={{
        title: "Booking Details",
      }}
      buttonObject={{
        uppercase: true,
        size: "sm",
        title: "Add Booking",
        path: routes.addBooking,
        icon: <IconPlus size={20} />,
        iconPosition: "right",
      }}
      headCells={headCells}
      getDataApiURI={`admin/getAllBookings`}
    />
  );
};

export default ViewBooking;
