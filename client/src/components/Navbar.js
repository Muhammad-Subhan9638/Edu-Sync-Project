import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/Edu-Sync.png';
import { UserContext } from '../App';
import { useEffect, useState } from 'react';


const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const [role, setRole] = useState(state ? state : "Site-User");
    useEffect(() => {
        if (state !== null) {
            localStorage.setItem("role", state);
        }
        else {
            let roleLogin = localStorage.getItem("role");
            if (roleLogin !== null) {
                setRole(roleLogin);
            }
            console.log(role);
        }
    }, [state]);
    const RenderMenu = () => {
        if (role === "User") {
            return (
                <>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/kanbanboard">Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/teacherslist">Teacher</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/library">Library</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/myprofile">My Account</Link>
                            </li>
                        </ul>
                    </div>
                </>
            );
        } else if (role === "Teacher") {
            return (
                <>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/task_maker">Task Maker</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/library">Library</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/teacherslist">Teacher</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/myprofile">My Account</Link>
                            </li>
                        </ul>
                    </div>
                </>
            );
        }
        else if (role === "Site-User") {
            return (
                <div div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            );
        }
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                <div className="navbar-brand">
                        <img src={Logo} width="80" alt="Logo" />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <RenderMenu />
                </div>
            </nav>
        </>
    );
};

export default Navbar;