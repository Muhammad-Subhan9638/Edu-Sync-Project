import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loginnavbar } from "./Loginnavbar";
import "./TeacherRegistration.css";

const TeacherRegistration = () => {
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Age: "",
    Gender: "",
    Address: "",
    City: "",
    Education: "",
    TeachingExperience: "",
    OnlineTeachingExperience: "",
    TeachingSubject: "",
    Description: "",
    Password: "",
    cPassword: "",
  });

  const [completedFields, setCompletedFields] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });

    if (name === "Password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8)
      errors.push("Password must be at least 8 characters.");
    if (!/[A-Z]/.test(password))
      errors.push("Password must contain an uppercase letter.");
    if (!/[a-z]/.test(password))
      errors.push("Password must contain a lowercase letter.");
    if (!/[0-9]/.test(password)) errors.push("Password must contain a number.");
    if (!/[!@#$%^&*]/.test(password))
      errors.push("Password must contain a special character.");
    setPasswordErrors(errors);
  };

  const countCompletedFields = useCallback(() => {
    const filledFields = Object.values(teacherData).filter(
      (field) => field.trim() !== ""
    ).length;
    setCompletedFields(filledFields);
  }, [teacherData]);

  useEffect(() => {
    countCompletedFields();
  }, [countCompletedFields]);

  const validateForm = () => {
    const { Password, cPassword } = teacherData;
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleCPasswordVisibility = () => {
    setCPasswordVisible(!cPasswordVisible);
  };

  const addTeacher = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    teacherData.TeachingSubject = teacherData.TeachingSubject.toUpperCase();

    try {
      const response = await Axios.post(
        "http://localhost:3001/add-teacher",
        teacherData
      );
      if (response.status === 200) {
        window.alert(
          "Congratulations! You are successfully added as a new teacher!"
        );
        navigate("/login");
      } else {
        window.alert(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Loginnavbar />
      <div className="forBg">
        <div className="body">
          <div className="registration-container">
            <div className="form-container py-4">
              <form className="registration-form" onSubmit={addTeacher}>
                <h3 className="form-title">Teacher Sign Up</h3>

                {/* Progress Bar */}
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${
                        (completedFields / Object.keys(teacherData).length) *
                        100
                      }%`,
                      backgroundColor: "#198f99",
                    }}
                  />
                </div>

                <div className="form-fields">
                  {/* Form Fields */}
                  <div className="field-group">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Full Name"
                      name="Name"
                      value={teacherData.Name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <input
                      type="email"
                      className="input-field"
                      placeholder="Email"
                      name="Email"
                      value={teacherData.Email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Phone"
                      name="Phone"
                      value={teacherData.Phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Gender"
                      name="Gender"
                      value={teacherData.Gender}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Age"
                      name="Age"
                      value={teacherData.Age}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <textarea
                      className="input-field"
                      placeholder="Address"
                      name="Address"
                      value={teacherData.Address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="City"
                      name="City"
                      value={teacherData.City}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Education"
                      name="Education"
                      value={teacherData.Education}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Teaching Experience"
                      name="TeachingExperience"
                      value={teacherData.TeachingExperience}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Online Teaching Experience"
                      name="OnlineTeachingExperience"
                      value={teacherData.OnlineTeachingExperience}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Teaching Subject"
                      name="TeachingSubject"
                      value={teacherData.TeachingSubject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <textarea
                      className="input-field"
                      placeholder="Bio"
                      name="Description"
                      value={teacherData.Description}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password Fields with Toggle and Validation */}
                  <div className="field-group password-field">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="input-field"
                      placeholder="Password"
                      name="Password"
                      value={teacherData.Password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? "Hide" : "Show"}
                    </button>
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
                      type={cPasswordVisible ? "text" : "password"}
                      className="input-field"
                      placeholder="Confirm Password"
                      name="cPassword"
                      value={teacherData.cPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={toggleCPasswordVisibility}
                    >
                      {cPasswordVisible ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <button type="submit" className="submit-button">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherRegistration;
