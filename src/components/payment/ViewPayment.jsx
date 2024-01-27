import { routes } from "../../helpers/routesHelper";
import { IconPlus } from "@tabler/icons-react";
import TableComponent from "../tableComponenet/TableComponent";
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
    date: true,
  },
];
const ViewPayment = () => {
  return (
    <TableComponent
      modalObject={{
        title: "Payment Details",
      }}
      buttonObject={{
        uppercase: true,
        size: "sm",
        title: "Add Payment",
        path: routes.addPayment,
        icon: <IconPlus size={20} />,
        iconPosition: "right",
      }}
      headCells={headCells}
      getDataApiURI={`admin/get-all-payments`}
    />
  );
};

export default ViewPayment;
