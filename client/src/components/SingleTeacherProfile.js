import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./SingleTeacherProfile.css"; // Custom CSS file for additional styling

const SingleTeacherProfile = () => {
  const { _id } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    callMyProfile();
  }, []);

  const callMyProfile = () => {
    Axios.get(`http://localhost:3001/single-teacher-profile/${_id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 px-3">
        <div className="text-center mb-4">
          <h1 className="display-4">Teacher Profile</h1>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 mb-4">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <img
                  src={userData.Image?.url || userData.Image}
                  alt={userData.Name}
                  className="rounded-circle img-fluid mb-3"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <h2 className="h5">{userData.Name}</h2>
                <p className="text-muted">Teacher</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-8">
            <div className="card shadow border-0">
              <div className="card-body">
                <h3 className="h5 mb-3">Personal Information</h3>
                <table className="table table-borderless table-responsive">
                  <tbody>
                    {/* Table data for teacher's information */}
                    {[
                      ["Full Name", userData.Name],
                      ["Email", userData.Email],
                      ["Phone", userData.Phone],
                      ["Age", userData.Age],
                      ["Gender", userData.Gender],
                      ["Address", userData.Address],
                      ["City", userData.City],
                      ["Education", userData.Education],
                      ["Teaching Experience", userData.TeachingExperience],
                      [
                        "Online Teaching Experience",
                        userData.OnlineTeachingExperience,
                      ],
                      ["Bio", userData.Description],
                    ].map(([label, value], index) => (
                      <tr key={index}>
                        <td className="fw-bold">{label}</td>
                        <td>:</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleTeacherProfile;
