import React from "react";
import { Link } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";

const Footer = () => {
  const styling = {
    backgroundColor: "rgba(0, 0, 0, 0.025)",
  };

  return (
    <>
      <footer className="text-center text-lg-start bg-light text-muted">
        {/* Social Media Section */}
        <section className="d-flex justify-content-center p-4 border-bottom">
          <div className="me-3 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
          <a href="https://www.facebook.com/" className="me-4 text-reset" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com/" className="me-4 text-reset" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i></a>
          <a href="https://github.com/Muhammad-Subhan9638/Edu-Sync-Project" className="me-4 text-reset" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i></a>
          <a href="https://linkedin.com/" className="me-4 text-reset" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i></a>

          </div>
        </section>

        {/* Main Content Section */}
        <section className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            {/* About Section */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 d-flex align-items-center gap-1">
                <FaBookReader className="icon-color" />
                Edu-Sync
              </h6>
              <p>
                Edu-Sync.com is a trusted free website for students and teachers
                worldwide. We may not be the biggest, but we care the most.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Quick Links</h6>
              <p>
                <Link to="/" className="text-reset">
                  Home
                </Link>
              </p>
              <p>
                <Link to="/about" className="text-reset">
                  About
                </Link>
              </p>
              <p>
                <Link to="/contact" className="text-reset">
                  Contact
                </Link>
              </p>
              <p>
                <Link to="/login" className="text-reset">
                  Login
                </Link>
              </p>
            </div>

            {/* Useful Links */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
              <p>
                <Link to="/teacherslist" className="text-reset">
                  Teachers
                </Link>
              </p>
              <p>
                <Link to="/myprofile" className="text-reset">
                  My Profile
                </Link>
              </p>
            </div>

            {/* Contact Information */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p className="d-flex align-items-center gap-1">
                <HiLocationMarker /> Lahore, Pakistan
              </p>
              <p className="d-flex align-items-center gap-1">
                <IoMdMail /> info@Edu-Sync.com
              </p>
              <p className="d-flex align-items-center gap-1">
                <IoCall /> (+92) 3096766172
              </p>
            </div>
          </div>
        </section>

        {/* Copyright Section */}
        <div className="text-center p-3" style={styling}>
          © 2024 Copyright:
          <Link className="text-reset fw-bold" to="/">
            {" "}
            Edu-Sync.com{" "}
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
