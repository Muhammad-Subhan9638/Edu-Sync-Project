import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { CookieFunction } from "../helpers/index";
import dummyProfile from "../assets/dummyprofile.png";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [AdminData, setAdminData] = useState({
    UserName: "",
    Password: "",
  });

  const LoginAdmin = async (e) => {
    e.preventDefault();
    try {
      Axios.post("http://localhost:3001/admin-login", AdminData)
        .then((response) => {
          if (response.status === 200) {
            CookieFunction(response);
            return navigate("/dashboard");
          } else {
            window.alert("Login Failed. Please try again later!");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...AdminData, [name]: value });
  };

  return (
    <div className="admin-login__body">
      <div className="admin-login__container">
        <img
          src={dummyProfile}
          alt="Profile"
          className="admin-login__profile-picture"
        />
        <h3 className="admin-login__title">Log In</h3>
        <form className="admin-login__form" onSubmit={LoginAdmin}>
          <div className="admin-login__field">
            <i className="admin-login__icon fas fa-user"></i>
            <input
              type="text"
              className="admin-login__input"
              placeholder="Enter Username"
              value={AdminData.UserName}
              name="UserName"
              onChange={handleChange}
            />
          </div>
          <div className="admin-login__field">
            <i className="admin-login__icon fas fa-lock"></i>
            <input
              type="password"
              className="admin-login__input"
              placeholder="Enter password"
              value={AdminData.Password}
              name="Password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="admin-login__button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
