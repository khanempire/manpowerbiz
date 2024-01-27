import { routes } from "../../helpers/routesHelper";
import TableComponent from "../tableComponenet/TableComponent";
import { IconEye, IconPlus } from "@tabler/icons-react";

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
    id: "bookingStatus",
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
    numeric: false,
    label: "Actions",
  },
];
const CustomerBookingsView = () => {
  const customerDetails = JSON.parse(localStorage.getItem("customerDetails"));
  return (
    customerDetails && (
      <TableComponent
        modalObject={{
          title: "Booking Details",
        }}
        buttonObject={{
          hidden: true,
          uppercase: true,
          size: "sm",
          title: "Add Booking",
          path: routes.addBooking,
          icon: <IconPlus size={20} />,
          iconPosition: "right",
        }}
        headCells={headCells}
        getDataApiURI={`customer/get-my-bookings/${customerDetails._id}`}
      />
    )
  );
};

export default CustomerBookingsView;
