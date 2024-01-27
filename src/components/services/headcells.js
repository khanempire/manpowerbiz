import { IconEye } from "@tabler/icons-react";

export const headCells = [
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
    id: "STATUS",
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
    view: <IconEye />,
    numeric: false,
    label: "Actions",
  },
  // { id: "action", numeric: false, disablePadding: true, label: "Action" },
];
