import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./About.css";
import {
  FaBullseye,
  FaHandshake,
  FaLightbulb,
  FaHeart,
  FaBook,
} from "react-icons/fa";

const About = () => {
  return (
    <>
      <Navbar />

      <div
        className="AboutBanner text-white d-flex align-items-center justify-content-center"
        style={{
          height: "300px",
          background: "linear-gradient(135deg, #16717a, #33a9b5)",
        }}
      >
        <h1 className="text-center text-white display-4 fw-bold">About Us</h1>
      </div>

      <div className="container my-5">
        <div className="row justify-content-center">
          {/* Introduction Card */}
          <div className="col-12 col-md-10 col-lg-8 mb-4 contentCards">
            <div className="card  p-4 border-0 shadow-lg text-center">
              <FaBook className="mb-3" size={40} color="#16717a" />
              <p className="fs-5">
                Edu-Sync.com is a trusted free platform for students and
                teachers worldwide. We aim to leave a lasting impression by
                caring deeply about our community. Tell your friends about
                us—we’re here to make a difference for you.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="col-12 col-md-6 mb-4 contentCards">
            <div className="card p-4 border-0 shadow-lg text-center">
              <FaBullseye className="mb-3" size={40} color="#16717a" />
              <h3 className="fw-bold">Our Mission</h3>
              <p className="fs-5">
                Our mission is to connect students with local and online
                teachers quickly and keep this service free for everyone. We aim
                to provide a suitable teacher within 24 hours.
              </p>
            </div>
          </div>

          {/* Commitment Card */}
          <div className="col-12 col-md-6 mb-4 contentCards">
            <div className="card p-4 border-0 shadow-lg text-center">
              <FaHandshake className="mb-3" size={40} color="#16717a" />
              <h3 className="fw-bold">Our Commitment</h3>
              <p className="fs-5">
                We respect your privacy and never share data without permission.
                Expect constant improvements and responsive feedback. We strive
                to enhance your experience whether you’re finding a tutor or a
                teaching job.
              </p>
            </div>
          </div>

          {/* Why We Do Things This Way Card */}
          <div className="col-12 col-md-6 mb-4 contentCards">
            <div className="card p-4 border-0 shadow-lg text-center">
              <FaLightbulb className="mb-3" size={40} color="#16717a" />
              <h3 className="fw-bold">Why We Do Things This Way</h3>
              <p className="fs-5">
                Balancing the needs of students and teachers is essential to us.
                For instance, we limit access to contact details to protect
                against spam. Our system prioritizes genuine engagement for a
                safe experience.
              </p>
            </div>
          </div>

          {/* Lessons Learned Card */}
          <div className="col-12 col-md-6 mb-4 contentCards">
            <div className="card p-4 border-0 shadow-lg text-center">
              <FaHeart className="mb-3" size={40} color="#16717a" />
              <h3 className="fw-bold">Lessons Learned</h3>
              <p className="fs-5">
                By setting high standards, we attract committed professionals.
                Our free contact policy for limited interactions helps maintain
                a respectful, quality community for all users.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
