/*eslint-disable*/
import {
  Box,
  Button,
  Container,
  Grid,
  Group,
  Loader,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useContext, useEffect, useRef, useState } from "react";
import Contacts from "./Contacts";
import Conversation from "./Conversation";
import axios from "axios";
import { getCallSpecificWithoutHeaders } from "../../helpers/apiCallHelpers";
import { io } from "socket.io-client";

const Message = () => {
  const match768 = useMediaQuery("(max-width: 768px)");
  const user = JSON.parse(localStorage.getItem("customerDetails"));
  // console.log("userID", user._id);

  //gojo: 6523d95670fb3087655dc5e9
  //sukuna: 652556d8b793c4d6765e1849
  //hashaam: 64d0b902c107a697e2579a68
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [searchUser, setSearchUser] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const apiResponse = await getCallSpecificWithoutHeaders(
          "conversations",
          user?._id
        );
        console.log("apiResponse: ", apiResponse);
        if (apiResponse.status === 200) {
          setConversations(apiResponse?.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  return (
    <Box p={"sm"}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <Loader size={"lg"} color="blue" variant="oval" />
        </div>
      ) : (
        <Grid gutter={0}>
          <Grid.Col span={match768 ? 4 : 3}>
            <Contacts
              searchUser={searchUser}
              setSelectedUser={setSelectedUser}
              selectedUser={selectedUser}
              setSearchUser={setSearchUser}
              conversations={conversations}
            />
          </Grid.Col>
          <Grid.Col span={match768 ? 8 : 9}>
            <Conversation
              selectedUser={selectedUser}
              messages={messages}
              setMessages={setMessages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
            />
          </Grid.Col>
        </Grid>
      )}
    </Box>
  );
};

export default Message;
