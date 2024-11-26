import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif"; // GIF for the robot
import { BrowserCookie } from "../helpers/BrowserCookies"; // Cookie helper to retrieve token
import Axios from "axios";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle potential errors from API

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const UserToken = BrowserCookie(); // Retrieve the user's token
        const token = UserToken.UserToken;

        // Fetch user profile data
        const response = await Axios.get("http://localhost:3001/my-profile", {
          headers: {
            authorization: `${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        setUserName(response.data.Name); // Set the user name
      } catch (err) {
        console.error(err);
        setError("Failed to load user profile."); // Error handling
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>; // Show loading message while fetching data
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>; // Show error message if something went wrong
  }

  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

// Styled components for layout and design
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;

  img {
    height: 20rem;
  }

  span {
    color: #4e0eff;
  }
`;

const LoadingMessage = styled.div`
  color: white;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.5rem;
`;
