import { ActionIcon, Avatar, Menu } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserAvatar = () => {
  const navigate = useNavigate();
  return (
    <Menu shadow="md" withArrow>
      <Menu.Target>
        <ActionIcon>
          <Avatar variant="gradient" size={"sm"} radius={"sm"} src={""} />
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
  );
};

export default UserAvatar;
