import React from 'react';
import { useState } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom'
import { Loginnavbar } from './Loginnavbar'

import Footer from './Footer'
const StudentRegistration = () => {
    const navigate = useNavigate()
    const [studentData, setStudentData] = useState({
        Name: "",
        Email: "",
        Phone: "",
        Age: "",
        Address: "",
        StudentClass: "",
        Password: "",
        cPassword: ""
    });
    const handleChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target
        setStudentData({ ...studentData, [name]: value })
    }
    const addStudent = async (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/add-student", studentData).then((response) => {
            console.log(response)
            if (response.status === 200) {
                window.alert("Congratulations! You are successfully added as a new student!");
                navigate('/login')
            } else {
                window.alert(response.data);
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
            {/* <div className="Lcontainer pt-4"> */}
            <div className="Lcontainer">
                <Loginnavbar />
                <div className="containers">
                    <div className="Auth-form-container py-4">
                        <form className="Auth-form ">
                            <div className="Auth-form-content">
                                <h3 className="Auth-form-title">Student Sign Up</h3>
                                <div className="d-flex justify-content-between">
                                    <div className="mx-2">
                                        <div className="login__field">
                                            <i className="login__icon fa-regular fa-user"></i>
                                            <input
                                                type="text"
                                                className="login__input"
                                                placeholder="e.g Jane Doe"
                                                name='Name'
                                                value={studentData.Name}
                                                onChange={(event) => handleChange(event)}
                                            />
                                        </div>
                                        <div className="login__field">
                                            <i className="login__icon fa-regular fa-envelope"></i>
                                            <input
                                                type="email"
                                                className="login__input"
                                                placeholder="Email"
                                                name='Email'
                                                value={studentData.Email}
                                                onChange={(event) => handleChange(event)}
                                            />
                                        </div>
                                        <div className="login__field">
                                            <i className="login__icon fa-solid fa-phone"></i>
                                            <input
                                                type="Phone"
                                                className="login__input"
                                                placeholder="Phone Number"
                                                name='Phone'
                                                value={studentData.Phone}
                                                onChange={(event) => handleChange(event)}
                                            />
                                        </div>
                                        <div className="login__field">
                                            <i className="login__icon fa-solid fa-person-cane"></i>
                                            <input
                                                type="text"
                                                className="login__input"
                                                placeholder="Age"
                                                name='Age'
                                                value={studentData.Age} onChange={(event) => handleChange(event)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mx-2">
                                        <div className="login__field">
                                            <i className="login__icon fa-solid fa-map-pin"></i>
                                            <input
                                                type="text"
                                                className="login__input"
                                                placeholder="Address"
                                                name='Address'
                                                value={studentData.Address} onChange={(event) => handleChange(event)}
                                            />
                                        </div>
                                        <div className="login__field">
                                            <i className="login__icon fa-solid fa-landmark"></i>
                                            <input
                                                type="text"
                                                className="login__input"
                                                placeholder="Class"
                                                name='StudentClass'
                                                value={studentData.StudentClass} onChange={(event) => handleChange(event)}
                                            />
                                        </div>
                                        <div className="login__field">
                                            <i className="login__icon fa-solid fa-lock"></i>
                                            <input
                                                type="Password"
                                                className="login__input"
                                                placeholder="Password"
                                                name='Password'
                                                value={studentData.Password} onChange={(event) => handleChange(event)}
                                            />
                                        </div>
                                        <div className="login__field">
                                            <i className="login__icon fa-solid fa-lock"></i>
                                            <input
                                                type="password"
                                                className="login__input"
                                                placeholder="Confirm Password"
                                                name='cPassword'
                                                value={studentData.cPassword} onChange={(event) => handleChange(event)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 mt-3 mx-2">
                                    <button type="submit" className="formbtn" onClick={addStudent}>
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
            {/* </div> */}
        </>
    )
}

export default StudentRegistration