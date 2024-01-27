import { IconEdit, IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import TableComponent from "../tableComponenet/TableComponent";
import { routes } from "../../helpers/routesHelper";
// import { headCells } from "./headcells"

let headCells = [
  { id: "SR", numeric: true, disablePadding: true, label: "ID" },
  {
    id: "serviceImages",
    numeric: false,
    disablePadding: true,
    label: "Image",
  },
  {
    id: "serviceTitle",
    numeric: false,
    disablePadding: true,
    label: "Title",
  },

  {
    id: "serviceDescription",
    numeric: false,
    disablePadding: true,
    label: "Desc",
  },
  {
    id: "serviceCity",
    numeric: false,
    disablePadding: true,
    label: "City",
  },
  {
    id: "serviceZipCode",
    numeric: false,
    disablePadding: true,
    label: "Zip",
  },

  {
    id: "serviceStatus",
    date: false,
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
  {
    id: "serviceContactPhone",
    date: false,
    numeric: false,
    disablePadding: true,
    label: "Phone",
  },
  {
    id: "serviceWhatsAppPhone",
    date: false,
    numeric: false,
    disablePadding: true,
    label: "WhatsApp",
  },
  {
    id: "serviceInfoEmail",
    date: false,
    numeric: false,
    disablePadding: true,
    label: "Info Mail",
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
    edit: { icon: <IconEdit />, editRoute: `${routes.editService}/` },
    delete: { icon: <IconTrash />, deleteURI: "admin/deleteService" },
    numeric: false,
    label: "Actions",
  },
  // { id: "action", numeric: false, disablePadding: true, label: "Action" },
];
const ViewServices = () => {
  return (
    <TableComponent
      modalObject={{
        title: "Service Details",
      }}
      buttonObject={{
        uppercase: true,
        size: "sm",
        title: "Add Service",
        path: routes.addService,
        icon: <IconPlus size={20} />,
        iconPosition: "right",
      }}
      headCells={headCells}
      getDataApiURI={"admin/getAllServices"}
    />
  );
};

export default ViewServices;
