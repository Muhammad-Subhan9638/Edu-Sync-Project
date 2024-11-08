import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { CookieFunction } from "../helpers/index";
import { UserContext } from "../App";
import { Loginnavbar } from "./Loginnavbar";
import { Loginfooter } from "./Loginfooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const alert = (text) => toast(text);
  const { state, dispatch } = useContext(UserContext);
  const Navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    Email: "",
    Password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (!userLogin.Email || !userLogin.Password) {
      alert("Please Enter All the Fields!");
    } else {
      Axios.post("http://localhost:3001/signin", userLogin)
        .then((response) => {
          const StatusCodeRes = response.status;
          if (StatusCodeRes === 200) {
            alert("Congratulations! You Login successfully!");
            const result = response.data;
            if (result.data.TeachingExperience) {
              dispatch({ type: "Teacher", payload: true });
              Navigate("/teacherprofile");
            } else {
              dispatch({ type: "User", payload: true });
              Navigate("/myprofile");
            }
            CookieFunction(response);
          } else {
            alert("Login failed!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="body LoginBody">
        <ToastContainer />
        <div className="registration-container ">
          <Loginnavbar />
          <div className="form-container py-4">
            <form className="registration-form" onSubmit={loginUser}>
              <h3 className="form-title">Log In</h3>
              <div className="field-group">
                <input
                  type="email"
                  className="input-field"
                  placeholder="Email"
                  value={userLogin.Email}
                  name="Email"
                  onChange={handleChange}
                />
              </div>
              <div className="field-group password-field">
                <input
                  type={passwordVisible ? "text" : "password"} // Toggle between text and password
                  className="input-field"
                  placeholder="Password"
                  value={userLogin.Password}
                  name="Password"
                  onChange={handleChange}
                />
                <span
                  className="password-toggle"
                  onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                >
                  {passwordVisible ? "Hide" : "Show"}
                </span>
              </div>
              <button type="submit" className="submit-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <Loginfooter />
    </>
  );
};

export default Login;
