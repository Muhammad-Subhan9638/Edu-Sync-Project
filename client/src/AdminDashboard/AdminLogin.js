import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';
import { CookieFunction } from '../helpers/index'
const AdminLogin = () => {
    const navigate = useNavigate()
    const [AdminData, setAdminData] = useState({
        UserName: "",
        Password: ""
    })

    const LoginAdmin = async (e) => {
        e.preventDefault()
        try {
            Axios.post('http://localhost:3001/admin-login', AdminData).then((response) => {
                // console.log(response.data);
                if (response.status === 200) {
                    CookieFunction(response)
                    return navigate('/dashboard')
                } else if (response.status === !200) {
                    window.alert("Login Failed Please try again later!")
                }
            }
            ).catch((error) => {
                console.error(error)
            }
            )
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target
        setAdminData({ ...AdminData, [name]: value })
    }


    return (
        <>
            <div className="Acontainer pt-4">
                <div className="containers">
                    <div className="screen">
                        <div className="screen__content">
                            <form className="login">
                                <h3 className="Auth-form-title">Log In</h3>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input
                                        type="text" className="login__input" placeholder="Enter Username"
                                        value={AdminData.UserName} name="UserName" onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-lock"></i>
                                    <input
                                        type="password" className="login__input" placeholder="Enter password"
                                        value={AdminData.Password} name="Password" onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" className="formbtn"
                                        onClick={LoginAdmin}
                                    >
                                        LOGIN
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="screen__background">
                            <span className="screen__background__shape screen__background__shape4"></span>
                            <span className="screen__background__shape screen__background__shape3"></span>
                            <span className="screen__background__shape screen__background__shape2"></span>
                            <span className="screen__background__shape screen__background__shape1"></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin