import React from "react";
import { useNavigate } from "react-router-dom";
import Global from "../images/global.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import classroom from "../images/classroom.png";
import "./Hero.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="hero">
        <div
          id="HeroID"
          className="d-flex flex-column align-items-center rounded"
        >
          <div>
            <p className="fs-2 fw-bold">Welcome</p>
          </div>
          <div>
            <h1>Find Online Teachers for Free !</h1>
          </div>
        </div>
      </div>
      <div className="container d-flex flex-wrap justify-content-center align-items-center my-4">
        <div className="col-12 col-md-6 mb-3">
          <img src={classroom} alt="Classroom" className="img-fluid rounded" />
        </div>
        <div className="col-12 col-md-6 my-4">
          <h2 className="text-center">About Edu-Sync</h2>
          <p className="text-center">
            Edu-Sync.com is a free website, trusted by thousands of students and
            teachers worldwide. We care the most...
          </p>
          <div className="d-flex justify-content-center">
            <button className="formbtn" onClick={() => navigate("/about")}>
              Read More
            </button>
          </div>
        </div>
      </div>

      <div className="HBanners d-flex flex-column justify-content-center align-items-center bg-dark">
        <h2 className="text-white text-center">High Quality Teachers</h2>
        <h4 className="text-white text-center">
          ONLY 55.1% OF TEACHERS THAT APPLY MAKE THROUGH OUR APPLICATION PROCESS
        </h4>
      </div>
      <div className="container w-75">
        <div className="d-flex flex-row justify-content-between mt-4">
          <div className="d-flex-row justify-content-center align-items-center">
            <p className="text-center">9500+</p>
            <h5 className="text-center">Subject</h5>
          </div>
          <div className="d-flex-row justify-content-center align-items-center">
            <p className="text-center">1500+</p>
            <h5 className="text-center">Skills</h5>
          </div>
          <div className="d-flex-row justify-content-center align-items-center">
            <p className="text-center">1000+</p>
            <h5 className="text-center">Languages</h5>
          </div>
        </div>
        <div>
          <div className="container teacherLink d-flex flex-column justify-content-center align-items-center my-4 BHbanner">
            <h2 className="text-center mb-3">What we do?</h2>
            <p className="text-center lead">
              Edu-Sync.com is a free website, trusted by thousands of students
              and teachers all over the world. You can find local tutors, online
              teachers, and educators to help with tutoring, coaching,
              assignments, academic projects, and dissertations for over 9500
              subjects.
            </p>
          </div>
        </div>
      </div>
      <div className="global d-flex flex-column p-3">
        <div className="d-flex justify-content-center align-item-center">
          <h3 className="text-white text-center">
            Teachers from over 170 countries
          </h3>
        </div>
        <div className="d-flex justify-content-center align-item-center">
          <img src={Global} alt="" srcSet="" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
