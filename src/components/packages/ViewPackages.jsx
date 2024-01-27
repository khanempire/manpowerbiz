import { IconEdit, IconEye, IconPlus } from "@tabler/icons-react";
import TableComponent from "../tableComponenet/TableComponent";
import { routes } from "../../helpers/routesHelper";
import { IconTrash } from "@tabler/icons-react";
let headCells = [
  { id: "SR", numeric: true, disablePadding: true, label: "ID" },
  {
    id: "packageImages",
    numeric: false,
    disablePadding: true,
    label: "Image",
  },
  {
    id: "packageTitle",
    numeric: false,
    disablePadding: true,
    label: "Package Title",
  },
  {
    id: "serviceTitle",
    numeric: false,
    disablePadding: true,
    label: "Service Title",
  },
  {
    id: "packageDescription",
    numeric: false,
    disablePadding: true,
    label: "Desc",
  },

  {
    id: "packagePrice",
    date: false,
    numeric: true,
    disablePadding: true,
    label: "Price",
  },
  {
    id: "packageStatus",
    date: false,
    numeric: true,
    disablePadding: true,
    label: "Status",
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
    edit: { icon: <IconEdit />, editRoute: `${routes.editPackage}/` },
    delete: { icon: <IconTrash />, deleteURI: "admin/deletePackage" },
    numeric: false,
    label: "Actions",
  },
  // { id: "action", numeric: false, disablePadding: true, label: "Action" },
];
const ViewPackages = () => {
  return (
    <TableComponent
      modalObject={{
        title: "Package Details",
      }}
      buttonObject={{
        uppercase: true,
        size: "sm",
        title: "Add Package",
        path: routes.addPackage,
        icon: <IconPlus size={20} />,
        iconPosition: "right",
      }}
      headCells={headCells}
      getDataApiURI={"admin/getAllPackages"}
    />
  );
};

export default ViewPackages;
