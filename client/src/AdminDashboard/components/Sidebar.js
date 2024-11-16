import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/Edu-Sync.png';
import { useCookies } from "react-cookie";
import Axios from 'axios';
import { BrowserCookie } from '../../helpers/BrowserCookies';
import './Sidebar.css';

export const Sidebar = () => {
    const [adminData, setAdminData] = useState('');
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    
    useEffect(() => {
        try {
            const UserToken = BrowserCookie();
            const token = UserToken.UserToken;
            Axios.get("http://localhost:3001/admin-dashboard", {
                headers: {
                    'authorization': `${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setAdminData(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
        } catch (err) {
            console.error(err);
        }
    }, []);
    
    const handleLogout = async () => {
        try {
            await removeCookie('token');
            navigate("/admin-login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="Adminsidebar d-flex flex-column align-items-center">
            {/* Sidebar Header */}
            <div className="sidebar-header text-center">
                <img src={Logo} alt="Edu-Sync Logo" className="Adminlogo mb-3" />
                <h5 className="admin-name">{adminData.Name || "Admin"}</h5>
            </div>

            {/* Navigation Menu */}
            <nav className="sidebar-menu flex-grow-1">
                <Link to="/" target="_blank" className="Sidebarbtn text-white">
                    <i className="fa-solid fa-globe"></i> Website
                </Link>
                <Link to="/dashboard/profile" className="Sidebarbtn text-white">
                    <i className="fa-solid fa-user"></i> Profile
                </Link>
                <Link to="/dashboard/studentslist" className="Sidebarbtn text-white">
                    <i className="fa-solid fa-graduation-cap"></i> Students
                </Link>
                <Link to="/dashboard/teacherslist" className="Sidebarbtn text-white">
                    <i className="fa-solid fa-person-chalkboard"></i> Teachers
                </Link>
                
                {/* Charts Dropdown */}
                <div className="dropdown w-100 ms-4">
                    <button
                        className="Sidebarbtn dropdown-toggle text-white"
                        type="button"
                        id="chartsDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i className="fa-solid fa-chart-pie"></i> Charts
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link to="/line-chart" className="dropdown-item">Line Chart</Link></li>
                        <li><Link to="/bar-chart" className="dropdown-item">Bar Chart</Link></li>
                        <li><Link to="/stackedbar-chart" className="dropdown-item">StackedBar Chart</Link></li>
                        <li><Link to="/pie-chart" className="dropdown-item">Pie Chart</Link></li>
                        <li><Link to="/area-chart" className="dropdown-item">Area Chart</Link></li>
                        <li><Link to="/stackedarea-chart" className="dropdown-item">StackedArea Chart</Link></li>
                    </ul>
                </div>

                <Link to="/dashboard/library" className="Sidebarbtn text-white">
                    <i className="fa-solid fa-book"></i> Library
                </Link>
            </nav>

            {/* Logout Button */}
            <button className="Sidebarbtn logout-btn mt-3 text-white" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
        </div>
    );
};
