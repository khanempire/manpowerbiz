/*eslint-disable*/
import { Button, Group, Paper, TextInput } from "@mantine/core";
import React from "react";

const Conversation = ({
  selectedUser,
  messages,
  setMessages,
  newMessage,
  setNewMessage,
  sendMessage,
}) => {
  return (
    <>
      <Paper p="md" bg={"#e5e5e5"}>
        <div>
          <h2>Chat with {selectedUser._id}</h2>
          <div
            style={{
              height: "300px",
              overflowY: "scroll",
              overflow: "hidden",
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  textAlign: message.senderId === 1 ? "right" : "left",
                  paddingRight: "8px",
                  paddingLeft: "8px",
                }}
              >
                <div
                  style={{
                    backgroundColor:
                      message.senderId === 1 ? "#3675e3" : "#5fe038",
                    display: "inline-block",
                    padding: "8px",
                    borderRadius: "8px",
                    maxWidth: "70%",
                    color: "#fff",
                    marginTop: message.senderId === 1 ? "8px" : "14px",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Group style={{ width: "100%" }} noWrap>
          <TextInput
            placeholder="Type a message..."
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            radius={"md"}
            style={{ width: "94%" }}
          />
          <Button radius={"md"} onClick={sendMessage}>
            Send
          </Button>
        </Group>
      </Paper>
    </>
  );
};

export default Conversation;
