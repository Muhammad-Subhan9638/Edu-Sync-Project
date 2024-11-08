import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loginnavbar } from "./Loginnavbar";
import { Loginfooter } from "./Loginfooter";
import "./StudentRegister.css";

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Age: "",
    Address: "",
    StudentClass: "",
    Password: "",
    cPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });

    if (name === "Password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }
    setPasswordErrors(errors);
  };

  const validateForm = () => {
    const { Password, cPassword } = studentData;
    if (passwordErrors.length > 0) {
      alert("Please meet all password requirements.");
      return false;
    }
    if (Password !== cPassword) {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  };

  const addStudent = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await Axios.post(
        "http://localhost:3001/add-student",
        studentData
      );
      if (response.status === 200) {
        alert("Congratulations! You are successfully added as a new student!");
        navigate("/login");
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="body">
        <div className="registration-container">
          <Loginnavbar />
          <div className="form-container py-4">
            <form className="registration-form" onSubmit={addStudent}>
              <h3 className="form-title">Student Sign Up</h3>
              <div className="form-fields">
                <div className="field-group">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Name"
                    name="Name"
                    value={studentData.Name}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-group">
                  <input
                    type="email"
                    className="input-field"
                    placeholder="Email"
                    name="Email"
                    value={studentData.Email}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-group">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Phone Number"
                    name="Phone"
                    value={studentData.Phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-group">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Age"
                    name="Age"
                    value={studentData.Age}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-group">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Address"
                    name="Address"
                    value={studentData.Address}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-group">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Class"
                    name="StudentClass"
                    value={studentData.StudentClass}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-group password-field">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="input-field"
                    placeholder="Password"
                    name="Password"
                    value={studentData.Password}
                    onChange={handleChange}
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </span>
                </div>
                <div className="password-requirements">
                  {passwordErrors.length > 0 && (
                    <ul>
                      {passwordErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="field-group password-field">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    className="input-field"
                    placeholder="Confirm Password"
                    name="cPassword"
                    value={studentData.cPassword}
                    onChange={handleChange}
                  />
                  <span
                    className="password-toggle"
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    {confirmPasswordVisible ? "Hide" : "Show"}
                  </span>
                </div>
              </div>
              <button type="submit" className="submit-button">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <Loginfooter />
    </>
  );
};

export default StudentRegistration;
