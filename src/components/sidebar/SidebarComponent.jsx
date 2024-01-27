import { useState } from "react";

import {
  Box,
  NavLink,
  Paper,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import {
  IconCards,
  IconCategory2,
  IconChevronRight,
  IconCurrencyRupee,
  IconEye,
  IconHome,
  IconNotebook,
  IconPackages,
  IconPlus,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { routes } from "../../helpers/routesHelper";

const data = [
  {
    icon: IconHome,
    label: "Dashboard",
    // description: "Item with description",
    path: routes.adminDashboard,
  },
  {
    icon: IconUsers,
    label: "Users",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
    path: "#",
    subNav: [
      {
        icon: IconPlus,
        label: "Add User",
        path: routes.addUser,
      },
      {
        icon: IconEye,
        label: "View All Users",
        path: routes.viewUser,
      },
    ],
  },
  {
    icon: IconCategory2,
    label: "Service Categories",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
    path: "#",
    subNav: [
      {
        icon: IconPlus,
        label: "Add Category",
        path: routes.addservicecategory,
      },
      {
        icon: IconEye,
        label: "View Categories",
        path: routes.viewServiceCategories,
      },
    ],
  },
  {
    icon: IconCards,
    label: "Services",
    path: "#",

    subNav: [
      {
        icon: IconPlus,
        label: "Add Service",
        path: routes.addService,
      },
      {
        icon: IconEye,
        label: "View Services",
        path: routes.viewServices,
      },
    ],
  },
  {
    icon: IconPackages,
    label: "Packages",
    path: "#",

    subNav: [
      {
        icon: IconPlus,
        label: "Add Package",
        path: routes.addPackage,
      },
      {
        icon: IconEye,
        label: "View Packages",
        path: routes.viewPackages,
      },
    ],
  },
  {
    icon: IconNotebook,
    label: "Bookings",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
    path: "#",

    subNav: [
      {
        icon: IconPlus,
        label: "Add Booking",
        path: routes.addBooking,
      },
      {
        icon: IconEye,
        label: "View Bookings",
        path: routes.viewBookings,
      },
    ],
  },
  {
    icon: IconCurrencyRupee,
    label: "Payments",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
    path: "#",

    subNav: [
      {
        icon: IconPlus,
        label: "Add Payment",
        path: routes.addPayment,
      },
      {
        icon: IconEye,
        label: "View Payments",
        path: routes.viewPayments,
      },
    ],
  },
  //   { icon: IconMessage, label: "Chats", path: "chats" },
  //   {
  //     icon: IconUserExclamation,
  //     label: "Complaints",
  //     rightSection: <IconChevronRight size={14} stroke={1.5} />,
  //     path: "#",

  //     subNav: [
  //       {
  //         icon: IconPlus,
  //         label: "Add Compaint",
  //         path: routes.addComplaint,
  //       },
  //       {
  //         icon: IconEye,
  //         label: "View Complaints",
  //         path: routes.viewComplaints,
  //       },
  //     ],
  //   },
  //   { icon: IconFileInfo, label: "Policies", path: routes.policies },
  { icon: IconSettings, label: "Settings", path: routes.settings },
  //   {
  //     icon: IconBrandFeedly,
  //     label: "Reviews & Feedback",
  //     path: routes.reviewsAndFeedbacks,
  //   },
  //   { icon: IconUserQuestion, label: "FAQs", path: routes.faq },
];
const SidebarComponent = () => {
  const [active, setActive] = useState(0);
  const [subActive, setSubActive] = useState(0);
  const theme = useMantineTheme();
  const items = data?.map((item, index) => (
    <NavLink
      styles={{ label: { fontSize: "1rem" } }}
      color={"blue"}
      // className={active === index ? "fgColorF" : ""}
      key={index}
      active={!item.subNav && active === index}
      label={index + 1 + " - " + item.label}
      description={item.description}
      rightSection={item.rightSection}
      icon={<item.icon color={theme.colors.blue[5]} size={25} stroke={1.5} />}
      component={Link}
      to={item.path}
      onClick={() => {
        setActive(index);
        setSubActive(null);
        if (!item.subNav) {
          // setOpened(false);
        }
      }}
    >
      {item.subNav &&
        item?.subNav?.map((subItem, i) => (
          <NavLink
            color={"blue"}
            styles={{ label: { fontSize: "1rem" } }}
            active={active === index && subActive === i}
            key={i}
            label={index + 1 + "." + (i + 1) + " - " + subItem.label}
            icon={
              <subItem.icon
                color={theme.colors.blue[5]}
                className="fgColorF"
                size={25}
                stroke={1.5}
              />
            }
            component={Link}
            to={subItem.path}
            onClick={() => {
              setSubActive(i);
              setActive(index);
              // setOpened(false);
            }}
          />
        ))}
    </NavLink>
  ));

  return (
    <Paper
      style={{ width: "100%", height: "80vh" }}
      component={ScrollArea}
      type="never"
      styles={{}}
    >
      <Box sx={{ width: "100%", height: "100%" }}>{items}</Box>
    </Paper>
  );
};

export default SidebarComponent;
