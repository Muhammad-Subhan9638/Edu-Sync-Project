import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { CookieFunction } from "../helpers/index";
import dummyProfile from "../assets/dummyprofile.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
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
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "400px" }}>
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
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="d-flex justify-content-center align-items-center">
              <div className="input-group">
                <span className="input-group-text bg-light text-dark">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter Username"
                  value={AdminData.UserName}
                  name="UserName"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="d-flex justify-content-center align-items-center">
              <div className="input-group">
                <span className="input-group-text bg-light text-dark">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  value={AdminData.Password}
                  name="Password"
                  onChange={handleChange}
                />
                <span
                  className="input-group-text bg-light text-dark"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
