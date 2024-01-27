import { IconEdit, IconEye, IconPlus, IconTrash } from "@tabler/icons-react"
import TableComponent from "../tableComponenet/TableComponent"
import { routes } from "../../helpers/routesHelper";


let headCells = [
    { id: "SR", numeric: true, disablePadding: true, label: "ID" },
    {
        id: "image",
        numeric: false,
        disablePadding: true,
        label: "Image",
    },
    {
        id: "categoryTitle",
        numeric: false,
        disablePadding: true,
        label: "Title",
    },
    {
        id: "categoryDescription",
        numeric: false,
        disablePadding: true,
        label: "Desc",
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
        id: "actions",
        view: { icon: <IconEye /> },
        edit: { icon: <IconEdit />, editRoute: `${routes.editservicecategory}/` },
        delete: { icon: <IconTrash />, deleteURI: "admin/deleteServiceCategory" },
        numeric: false,
        label: "Actions",
    },
    // { id: "action", numeric: false, disablePadding: true, label: "Action" },
];
const ViewServiceCategory = () => {
    return (
        <TableComponent
            modalObject={{
                title: "Category Details"
            }}
            buttonObject={{
                uppercase: true,
                size: "sm",
                title: "Add Category",
                path: routes.addservicecategory,
                icon: <IconPlus size={20} />,
                iconPosition: "right"
            }} headCells={headCells} getDataApiURI={"admin/getAllServicesCategories"} />

    )
}

export default ViewServiceCategory