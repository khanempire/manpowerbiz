import { IconEye, IconPlus } from "@tabler/icons-react"
import TableComponent from "../tableComponenet/TableComponent"
import { data } from "./mockData"
import { routes } from "../../helpers/routesHelper";
let headCells = [
    { id: "SR", numeric: false, disablePadding: false, label: "ID" },

    {
        id: "CUSTOMER_NAME",
        numeric: false,
        disablePadding: true,
        label: "Customer",
    },
    {
        id: "VENDOR_PACKAGE_TITLE",
        numeric: false,
        disablePadding: true,
        label: "Package Title",
    },

    {
        id: "VENDOR_BUSINESS_TITLE",
        date: false,
        numeric: false,
        disablePadding: true,
        label: "Service Title",
    },
    {
        id: "rating",
        date: false,
        numeric: true,
        disablePadding: true,
        label: "Rating",
    },
    {
        id: "customerReview",
        date: false,
        numeric: false,
        disablePadding: true,
        label: "Review",
    },
    {
        id: "bookingDate",
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
const ReviewsAndFeebacks = () => {
    return (
        <TableComponent
            modalObject={{
                title: "Package Details"
            }}
            buttonObject={{
                hidden: true,
                uppercase: true,
                size: "sm",
                title: "Add Review",
                path: routes.reviewsAndFeedbacks,
                icon: <IconPlus size={20} />,
                iconPosition: "right"
            }}
            headCells={headCells} rowData={data} />
    )
}

export default ReviewsAndFeebacks