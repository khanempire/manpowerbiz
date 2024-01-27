import React, { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Burger,
  useMantineTheme,
  Group,
  Menu,
  ActionIcon,
  Avatar,
  Title,
  Paper,
  ScrollArea,
  Image,
} from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarComponent from "../sidebar/SidebarComponent";
import { ToggleTheme } from "./theme/ToggleTheme";
import { IconLogout } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import website_logo from "../../assets/website_logo.png";
const Appshell = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const match391 = useMediaQuery("(max-width: 391px)");
  const match768 = useMediaQuery("(max-width: 768px)");

  return (
    <AppShell
      p={"md"}
      m={0}
      padding={0}
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
        root: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ base: opened ? 275 : 0, sm: 275, md: 275, lg: 275, xl: 275 }}
        >
          <SidebarComponent />
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          ManpowerBiz &copy; 2023
        </Footer>
      }
      header={
        <Header height={{ base: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <Group position="apart" w={"100%"}>
              {match768 && (
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              )}
              {!match768 && (
                <Image style={{ width: "50px" }} src={website_logo} />
              )}
              {<Title order={!match391 ? 1 : 4}>Admin Panel</Title>}
              <Group>
                <Menu shadow="md" withArrow>
                  <Menu.Target>
                    <ActionIcon>
                      <Avatar
                        variant="gradient"
                        size={"sm"}
                        radius={"sm"}
                        src={""}
                      />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    {[
                      {
                        label: "Profile",
                        items: [
                          {
                            icon: <IconLogout />,
                            item: "Logout",
                            onClick: () => {
                              navigate("/auth");
                              localStorage.clear();
                            },
                          },
                        ],
                      },
                    ].map((element, index) => {
                      return (
                        <React.Fragment key={index}>
                          <Menu.Label>{element.label}</Menu.Label>
                          {element.items.map((item, index) => {
                            return (
                              <Menu.Item
                                onClick={item.onClick}
                                key={index}
                                icon={item.icon}
                              >
                                {item.item}
                              </Menu.Item>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </Menu.Dropdown>
                </Menu>
                <ToggleTheme />
              </Group>
            </Group>
          </div>
        </Header>
      }
    >
      <Paper withBorder component={ScrollArea}>
        <Outlet />
      </Paper>
    </AppShell>
  );
};

export default Appshell;
