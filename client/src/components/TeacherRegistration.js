import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Loginnavbar } from './Loginnavbar'
// import BG1 from '../images/2.png'
const TeacherRegistration = () => {
    const navigate = useNavigate()
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
        cPassword: ""
    })
    const handleChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target
        setTeacherData({ ...teacherData, [name]: value })
    }
    const addTeacher = async (e) => {
        teacherData.TeachingSubject = teacherData.TeachingSubject.toUpperCase()
        e.preventDefault();
        Axios.post("http://localhost:3001/add-teacher", teacherData).then((response) => {
            if (response.status === 200) {
                window.alert("Congratulations! You are successfully added as a new teacher!");
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
            {/* <Navbar /> */}
            <div className="Rcontainer">
                <Loginnavbar />
                <div className="Auth-form-container py-4">
                    <form className="Auth-form1">
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Teacher Sign Up</h3>
                            <div className="d-flex justify-content-between">
                                <div className="mx-2">
                                    <div className="login__field">
                                        <i className="login__icon fa-regular fa-user"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="e.g Jane Doe"
                                            name='Name'
                                            value={teacherData.Name}
                                            onChange={(event) => handleChange(event)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-regular fa-envelope"></i>
                                        <input
                                            type="email"
                                            className="login__input"
                                            placeholder="Email"
                                            name="Email"
                                            value={teacherData.Email}
                                            onChange={(event) => handleChange(event)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-phone"></i>
                                        <input
                                            type="number"
                                            className="login__input"
                                            placeholder="Phone"
                                            name="Phone"
                                            value={teacherData.Phone}
                                            onChange={(event) => handleChange(event)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-person-half-dress"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="Gender"
                                            name="Gender"
                                            value={teacherData.Gender}
                                            onChange={(event) => handleChange(event)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-person-cane"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="Age"
                                            name="Age"
                                            value={teacherData.Age}
                                            onChange={(event) => handleChange(event)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-map-pin"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="Address"
                                            name="Address"
                                            value={teacherData.Address}
                                            onChange={(event) => handleChange(event)}
                                        />
                                    </div>
                                </div>
                                <div className="mx-2">
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-map-pin"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="City"
                                            name="City"
                                            value={teacherData.City}
                                            onChange={(event) => handleChange(event)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-landmark"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="Education"
                                            name="Education"
                                            value={teacherData.Education}
                                            onChange={(event) => handleChange(event)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-chalkboard-user"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="Online Teaching Experience"
                                            name="OnlineTeachingExperience"
                                            value={teacherData.OnlineTeachingExperience}
                                            onChange={(event) => handleChange(event)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-chalkboard-user"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="Physical Teaching Experience"
                                            name="TeachingExperience"
                                            value={teacherData.TeachingExperience}
                                            onChange={(event) => handleChange(event)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-book"></i>
                                        <input className='login__input' type="textarea" placeholder='Teaching Suject'
                                            name="TeachingSubject" 
                                            rows="5"
                                            value={teacherData.TeachingSubject}
                                            onChange={(event) => handleChange(event)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-biohazard"></i>
                                        <input className='login__input' type="text" placeholder='Bio' 
                                        name="Description" 
                                        value={teacherData.Description}
                                            onChange={(event) => handleChange(event)} />
                                    </div>
                                </div>
                            </div>
                            <div className="mx-2">
                                <div className="login__field">
                                    <i className="login__icon fa-solid fa-lock"></i>
                                    <input
                                        type="Password"
                                        className="login__input"
                                        placeholder="Password"
                                        name="Password"
                                        value={teacherData.Password}
                                        onChange={(event) => handleChange(event)}
                                    />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fa-solid fa-lock"></i>
                                    <input
                                        type="password"
                                        className="login__input"
                                        placeholder="Confirm Password"
                                        name="cPassword"
                                        value={teacherData.cPassword}
                                        onChange={(event) => handleChange(event)}
                                    />
                                </div>
                            </div>
                            <div className="d-grid gap-2 mt-3 mx-2">
                                <button type="submit" className="formbtn" onClick={addTeacher}>
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default TeacherRegistration