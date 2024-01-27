import { IconEdit, IconEye, IconTrash, IconUserPlus } from "@tabler/icons-react";
import TableComponent from "../tableComponenet/TableComponent"
import { routes } from "../../helpers/routesHelper";

let headCells = [
    { id: "SR", numeric: true, disablePadding: true, label: "ID" },
    // {
    //     id: "image",
    //     numeric: false,
    //     disablePadding: true,
    //     label: "Image",
    // },
    {
        id: "userType",
        numeric: false,
        disablePadding: true,
        label: "Type",
    },
    {
        id: "fullName",
        numeric: false,
        disablePadding: true,
        label: "Name",
    },
    {
        id: "email",
        numeric: false,
        disablePadding: true,
        label: "Email",
    },
    {
        id: "contactNumber",
        date: false,
        numeric: false,
        disablePadding: true,
        label: "Phone",
    },
    {
        id: "whatsappNumber",
        date: false,
        numeric: false,
        disablePadding: true,
        label: "WhatsApp",
    },
    {
        id: "status",
        date: false,
        numeric: false,
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
        id: "updatedAt",
        date: true,
        numeric: false,
        disablePadding: true,
        label: "Updated At",
    },
    {
        id: "actions",
        // view: { icon: <IconEye /> },
        edit: { icon: <IconEdit />, editRoute: `${routes.editUser}/` },
        delete: { icon: <IconTrash />, deleteURI: "admin/deleteUser" },
        numeric: false,
        label: "Actions",
    },
    // {id: "action", numeric: false, disablePadding: true, label: "Action" },
];



const ViewUser = () => {
    return (
        <TableComponent
            modalObject={{
                title: "User Details"
            }}
            buttonObject={{
                uppercase: true,
                size: "sm",
                title: "Add User",
                path: routes.addUser,
                icon: <IconUserPlus size={20} />,
                iconPosition: "right"
            }} headCells={headCells}
            getDataApiURI={"admin/getAllUsers"}
        />
    )
}

export default ViewUser