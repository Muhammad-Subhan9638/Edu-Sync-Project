import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allTeacherRoute, host, allStudentRoute } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { BrowserCookie } from "../helpers/BrowserCookies";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      const { UserToken } = BrowserCookie();
      if (!UserToken) {
        navigate("/login");
        return;
      }

      try {
        const response = await Axios.get("http://localhost:3001/my-profile", {
          headers: {
            authorization: `Bearer ${UserToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = response.data;
        setCurrentUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      const { UserToken } = BrowserCookie();
      if (!UserToken) return;

      try {
        const response = await Axios.get("http://localhost:3001/my-profile", {
          headers: {
            authorization: `Bearer ${UserToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const data = response.data;
        if (data.OnlineTeachingExperience) {
          getStudentsList();
        } else if (data.StudentClass) {
          getTeachersList();
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getTeachersList = async () => {
      try {
        const data = await Axios.get(`${allTeacherRoute}`);
        setContacts(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getStudentsList = async () => {
      try {
        const data = await Axios.get(`${allStudentRoute}`);
        setContacts(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
