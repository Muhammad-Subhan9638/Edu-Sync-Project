import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../images/Edu-Sync.png";
import { UserContext } from "../App";
import "./Navbar.css"; // Import the custom CSS

const Navbar = () => {
  const { state } = useContext(UserContext);
  const [role, setRole] = useState(state || "Site-User");

  useEffect(() => {
    if (state) {
      localStorage.setItem("role", state);
    } else {
      const storedRole = localStorage.getItem("role");
      if (storedRole) setRole(storedRole);
    }
  }, [state]);

  const RenderMenu = () => {
    const commonLinks = (
      <>
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link custom-hover active"
                : "nav-link custom-hover"
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "nav-link custom-hover active"
                : "nav-link custom-hover"
            }
          >
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "nav-link custom-hover active"
                : "nav-link custom-hover"
            }
          >
            Contact
          </NavLink>
        </li>
      </>
    );

    const userLinks = (
      <>
        {commonLinks}
        <li className="nav-item">
          <NavLink
            to="/kanbanboard"
            className={({ isActive }) =>
              isActive
                ? "nav-link custom-hover active"
                : "nav-link custom-hover"
            }
          >
            Tasks
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/teacherslist"
            className={({ isActive }) =>
              isActive
                ? "nav-link custom-hover active"
                : "nav-link custom-hover"
            }
          >
            Teacher
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/library"
            className={({ isActive }) =>
              isActive
                ? "nav-link custom-hover active"
                : "nav-link custom-hover"
            }
          >
            Library
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/myprofile"
            className={({ isActive }) =>
              isActive
                ? "nav-link custom-hover active"
                : "nav-link custom-hover"
            }
          >
            My Account
          </NavLink>
        </li>
      </>
    );

    const teacherLinks = (
      <>
        {commonLinks}
        <li className="nav-item">
          <NavLink
            to="/task_maker"
            className={({ isActive }) =>
              isActive
                ? "nav-link custom-hover active"
                : "nav-link custom-hover"
            }
          >
            Task Maker
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/library"
            className={({ isActive }) =>
              isActive
                ? "nav-link custom-hover active"
                : "nav-link custom-hover"
            }
          >
            Library
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/teacherslist"
            className={({ isActive }) =>
              isActive
                ? "nav-link custom-hover active"
                : "nav-link custom-hover"
            }
          >
            Teacher
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/myprofile"
            className={({ isActive }) =>
              isActive
                ? "nav-link custom-hover active"
                : "nav-link custom-hover"
            }
          >
            My Account
          </NavLink>
        </li>
      </>
    );

    const siteUserLinks = (
      <>
        {commonLinks}
        <li className="nav-item">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "nav-link custom-hover active"
                : "nav-link custom-hover"
            }
          >
            Login
          </NavLink>
        </li>
      </>
    );

    return (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          {role === "User" && userLinks}
          {role === "Teacher" && teacherLinks}
          {role === "Site-User" && siteUserLinks}
        </ul>
      </div>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={Logo} width="85" alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <RenderMenu />
      </div>
    </nav>
  );
};

export default Navbar;
