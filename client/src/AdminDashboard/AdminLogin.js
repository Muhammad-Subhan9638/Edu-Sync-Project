import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { CookieFunction } from "../helpers/index";
import dummyProfile from "../assets/dummyprofile.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../AdminDashboard/AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [AdminData, setAdminData] = useState({
    UserName: "",
    Password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const LoginAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        "http://localhost:3001/admin-login",
        AdminData
      );
      if (response.status === 200) {
        CookieFunction(response);
        navigate("/dashboard");
      } else {
        window.alert("Login Failed. Please try again later!");
      }
    } catch (error) {
      console.error(error);
      window.alert("An error occurred while logging in.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...AdminData, [name]: value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg w-100"
        style={{ maxWidth: "400px", borderRadius: "15px" }}
      >
        <div className="text-center">
          <img
            src={dummyProfile}
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px" }}
          />
          <h3 className="mb-4">Admin Login</h3>
        </div>
        <form onSubmit={LoginAdmin}>
          <div className="custom-input-container mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="custom-input-wrapper">
              <input
                type="text"
                id="username"
                className="custom-input"
                placeholder="Enter Username"
                value={AdminData.UserName}
                name="UserName"
                onChange={handleChange}
              />
              <i className="fas fa-user custom-icon"></i>
            </div>
          </div>
          <div className="custom-input-container mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="custom-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="custom-input"
                placeholder="Enter Password"
                value={AdminData.Password}
                name="Password"
                onChange={handleChange}
              />
              <span
                className="password-icon"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="w-100 loginButton">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
