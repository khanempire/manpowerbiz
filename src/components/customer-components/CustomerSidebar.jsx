import { useState } from "react";

import { Box, NavLink, Paper, ScrollArea } from "@mantine/core";
import { Link } from "react-router-dom";
import {
  IconChevronRight,
  IconCurrencyRupee,
  IconEye,
  IconHome,
  IconNotebook,
  IconSettings,
} from "@tabler/icons-react";
import { customerRoutes } from "../../helpers/routesHelper";

const data = [
  {
    icon: IconHome,
    label: "Dashboard",
    // description: "Item with description",
    path: customerRoutes.customerHome,
  },

  {
    icon: IconNotebook,
    label: "Bookings",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
    path: "#",

    subNav: [
      {
        icon: IconEye,
        label: "View Bookings",
        path: customerRoutes.customerBookings,
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
        icon: IconEye,
        label: "View Payments",
        path: customerRoutes.customerPayments,
      },
    ],
  },

  {
    icon: IconSettings,
    label: "Settings",
    path: customerRoutes.customerSettings,
  },
];
const CustomerSidebar = () => {
  const [active, setActive] = useState(0);
  const [subActive, setSubActive] = useState(0);

  const items = data?.map((item, index) => (
    <NavLink
      styles={{ label: { fontSize: "1rem" } }}
      color={"red"}
      // className={active === index ? "fgColorF" : ""}
      key={index}
      active={!item.subNav && active === index}
      label={index + 1 + " - " + item.label}
      description={item.description}
      rightSection={item.rightSection}
      icon={<item.icon className="fgColorF" size={25} stroke={1.5} />}
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
            color={"red"}
            styles={{ label: { fontSize: "1rem" } }}
            active={active === index && subActive === i}
            key={i}
            label={index + 1 + "." + (i + 1) + " - " + subItem.label}
            icon={<subItem.icon className="fgColorF" size={25} stroke={1.5} />}
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
      withBorder
      style={{ width: "", height: "70vh" }}
      component={ScrollArea}
      type="never"
      styles={{}}
    >
      <Box sx={{ width: "300px", height: "100%" }}>{items}</Box>
    </Paper>
  );
};

export default CustomerSidebar;
