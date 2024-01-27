/*eslint-disable*/
import { Group, Paper, Text, TextInput } from "@mantine/core";
import React from "react";

const Contacts = ({
  searchUser,
  setSearchUser,
  conversations,
  selectedUser,
  setSelectedUser,
}) => {
  return (
    <div>
      <Paper p={"xs"} bg={"#eee"}>
        <TextInput
          placeholder="Search users..."
          fullWidth
          style={{ marginBottom: "16px" }}
          value={searchUser}
          onChange={(event) => setSearchUser(event.currentTarget.value)}
          radius={"md"}
        />
        {conversations.map((user) => (
          <div
            style={{
              marginBottom: "8px",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid #2073f7",
              cursor: "pointer",
              backgroundColor: selectedUser?._id === user._id ? "#9fb9e0" : "",
            }}
            onClick={() => setSelectedUser(user)}
          >
            <Text>{user.members[0]}</Text>
          </div>
        ))}
      </Paper>
    </div>
  );
};

export default Contacts;
