import React from 'react';
import { useState } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../AdminDashboard/components/Sidebar';
import { AdminFooter } from '../AdminDashboard/components/AdminFooter';

const AdminRegister = () => {
    const navigate = useNavigate();
    const [AdminData, setAdminData] = useState({
        Name: "",
        Email: "",
        Phone: "",
        UserName: "",
        Password: "",
        cPassword: ""
    });
    const handleChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target
        setAdminData({ ...AdminData, [name]: value })
    }
    const addAdmin = async (e) => {
        e.preventDefault();
        const {
            Name,
            Email,
            Phone,
            UserName,
            Password,
            cPassword
        } = AdminData;
        if (!Name || !Email || !Phone || !UserName || !Password || !cPassword) {
            window.alert("Please enter all the required fields");
        }
        Axios.post("http://localhost:3001/admin-signup", AdminData).then((response) => {
            if (response.status === 200) {
                window.alert("Congratulations! You are successfully added as a new Admin!");
                navigate("/dashboard/profile");
            } else if (response.status === 201) {
                window.alert("Please Enter Valid Credentials.");
            } else if (response.status === 202) {
                window.alert(" Please Fill all the fields. Sorry, something went wrong!");
            }
        }).catch((error) => {
            console.log(error);
        });
    };
    function back() {
        return navigate("/dashboard/profile");
    }
    return (
        <>
            <div className="d-flex">
                <Sidebar />
                <div style={{
                    width: "100%",
                    height: "100vh"
                }}>
                    <div className="Scontainer">
                        <button className='backBtn' onClick={() => back()}><i className="fa-solid fa-backward"></i> Back to Profile</button>
                        <div className="containers">
                            <div className="Auth-form-container py-4">
                                <form className="Auth-form ">
                                    <div className="Auth-form-content">
                                        <h3 className="Auth-form-title">Admin Sign Up</h3>
                                        <div className="d-flex justify-content-between">
                                            <div className="mx-2">
                                                <div className="login__field">
                                                    <i className="login__icon fa-regular fa-user"></i>
                                                    <input
                                                        type="text"
                                                        className="login__input"
                                                        placeholder="e.g Jane Doe"
                                                        name='Name'
                                                        value={AdminData.Name}
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
                                                        value={AdminData.Email}
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
                                                        value={AdminData.Phone}
                                                        onChange={(event) => handleChange(event)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mx-2">
                                                <div className="login__field">
                                                    <i className="login__icon fa-regular fa-user"></i>
                                                    <input
                                                        type="text"
                                                        className="login__input"
                                                        placeholder="Username"
                                                        name='UserName'
                                                        value={AdminData.UserName} onChange={(event) => handleChange(event)}
                                                    />
                                                </div>
                                                <div className="login__field">
                                                    <i className="login__icon fa-solid fa-lock"></i>
                                                    <input
                                                        type="Password"
                                                        className="login__input"
                                                        placeholder="Password"
                                                        name='Password'
                                                        value={AdminData.Password} onChange={(event) => handleChange(event)}
                                                    />
                                                </div>
                                                <div className="login__field">
                                                    <i className="login__icon fa-solid fa-lock"></i>
                                                    <input
                                                        type="password"
                                                        className="login__input"
                                                        placeholder="Confirm Password"
                                                        name='cPassword'
                                                        value={AdminData.cPassword} onChange={(event) => handleChange(event)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2 mt-3 mx-2">
                                            <button type="submit" className="formbtn" onClick={addAdmin}>
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <AdminFooter /> */}
        </>
    );
};

export default AdminRegister;