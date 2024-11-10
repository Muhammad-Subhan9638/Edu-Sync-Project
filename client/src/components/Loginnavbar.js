import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Edu-Sync.png";
import "./LoginNavbar.css";

export const Loginnavbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
    <div className="positionNav">
      <nav className="navbar navbar-expand-lg navbar-light bg-light w-100 loginNav  rounded-0 rounded-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={Logo} width="80" alt="Logo" />
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link custom-hover" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-hover" to="/login">
                  Login
                </Link>
              </li>
              {/* Additional nav items if needed */}
              <li className="nav-item">
                <button
                  className="btn custom-color"
                  style={{ backgroundColor: "#16717a", color: "#fff" }}
                  onClick={handleOpenModal}
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          onClick={handleCloseModal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sign Up</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-center text-muted">Don’t have an account?</p>
                <p>
                  <Link
                    to="/studentregistration"
                    className="btn w-100 mb-2 text-light"
                  >
                    Sign Up as a Student
                  </Link>
                </p>
                <p>
                  <Link
                    to="/teacherregistration"
                    className="btn w-100 text-light"
                  >
                    Sign Up as a Teacher
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        
      )}
    </>
  );
};
