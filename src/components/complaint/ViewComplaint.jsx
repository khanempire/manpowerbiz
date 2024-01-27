import { IconEye, IconPlus } from "@tabler/icons-react"
import TableComponent from "../tableComponenet/TableComponent"
import { data } from "./mockData"
import { routes } from "../../helpers/routesHelper";
let headCells = [
    { id: "SR", numeric: false, disablePadding: true, label: "ID" },

    {
        id: "CUSTOMER_NAME",
        numeric: false,
        disablePadding: true,
        label: "Customer",
    },
    {
        id: "complaintTitle",
        numeric: false,
        disablePadding: true,
        label: "Title",
    },
    {
        id: "complaintDescription",
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
        id: "BOOKING_DATE",
        date: true,
        numeric: false,
        disablePadding: true,
        label: "Booked At",
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
        view: <IconEye />,
        numeric: false,
        label: "Actions",
    },
    // { id: "action", numeric: false, disablePadding: true, label: "Action" },
];
const ViewComplaint = () => {
    return (
        <TableComponent
            modalObject={{
                title: "Service Details"
            }}
            buttonObject={{
                uppercase: true,
                size: "sm",
                title: "Add Service",
                path: routes.addService,
                icon: <IconPlus size={20} />,
                iconPosition: "right"
            }} headCells={headCells} rowData={data} />
    )
}

export default ViewComplaint