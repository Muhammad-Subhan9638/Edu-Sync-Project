import React, { useEffect, useState, useContext, useCallback } from "react";
import Axios from "axios";
import { BrowserCookie } from "../helpers/BrowserCookies";
import { useCookies } from "react-cookie";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import UpdatePopup from "./UpdatePopup";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./myProfile.css";

const MyProfile = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [, , removeCookie] = useCookies(["token"]);
  const [trigger, setTrigger] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [Image, setImage] = useState(null);
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [updatedStudentClass, setUpdatedStudentClass] = useState("");
  const [updatedAge, setUpdatedAge] = useState("");
  const [loading, setLoading] = useState(false); // Main loading state
  const [imageLoading, setImageLoading] = useState(false); // Profile picture loading state

  const alert = (text) => toast(text);

  const UpdatedData = {
    _id: userData._id,
    Name: updatedName,
    Email: userData.Email,
    Phone: updatedPhone,
    Address: updatedAddress,
    StudentClass: updatedStudentClass,
    Age: updatedAge,
  };

  const callMyprofile = useCallback(() => {
    try {
      setLoading(true);
      const UserToken = BrowserCookie();
      const token = UserToken.UserToken;
      Axios.get("http://localhost:3001/my-profile", {
        headers: {
          authorization: `${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          const Data = response.data;
          setUserData(Data);
          if (Data.TeachingExperience) {
            navigate("/teacherprofile");
          } else if (Data.UserName) {
            navigate("/dashboard");
          } else {
            navigate("/myprofile");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    callMyprofile();
  }, [callMyprofile]);

  const editHandler = () => setTrigger(true);

  async function handleRemoveCookie() {
    removeCookie("token");
    navigate("/login");
    localStorage.removeItem("role");
    dispatch({ type: state, payload: false });
  }

  async function UpdateData(e) {
    e.preventDefault();
    if (
      !updatedName ||
      !updatedPhone ||
      !updatedAddress ||
      !updatedStudentClass ||
      !updatedAge
    ) {
      return alert("Please Enter all the fields below");
    } else {
      try {
        setLoading(true);
        Axios.put("http://localhost:3001/update-student", UpdatedData)
          .then((response) => {
            if (response.status === 200) {
              alert("Success!");
              setUserData(response.data);
              setTrigger(false);
            } else {
              alert("Error!");
            }
          })
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  }

  const save = () => {
    const imageData = new FormData();
    imageData.append("_id", userData._id);
    imageData.append("file", Image);

    if (Image) {
      try {
        setImageLoading(true); // Set image loading to true
        Axios.post("http://localhost:3001/update-img", imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => {
            if (response.status === 200) {
              setUserData(response.data);
              navigate("/myprofile");
            } else {
              alert("Your Data Didn't Update!");
            }
          })
          .catch((error) => console.error(error))
          .finally(() => setImageLoading(false)); // Set image loading to false
      } catch (e) {
        console.error(e);
        setImageLoading(false);
      }
    } else {
      alert("Please Upload Your Profile Pic");
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      {loading && (
        <div className="loading-spinner">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="profile-page container-fluid py-5">
        <div className="row">
          {/* Left Sidebar */}
          <div className="col-lg-3 col-md-4">
            <div className="profile-card card shadow-lg">
              <div className="card-body text-center">
                <div className="profile-img-wrapper">
                  {imageLoading ? (
                    <div
                      className="spinner-border profile-img-loader"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <>
                      {userData.Image?.url ? (
                        <img
                          src={userData.Image.url}
                          alt="Profile"
                          className="profile-img rounded-circle mb-3"
                          width="150"
                          height="150"
                        />
                      ) : (
                        <img
                          src={userData.Image}
                          alt="Profile"
                          className="profile-img rounded-circle mb-3"
                          width="150"
                          height="150"
                        />
                      )}
                    </>
                  )}
                </div>
                <div>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input
                      id="files"
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const selectedFile = event.target.files[0];
                        if (selectedFile) {
                          setImage(selectedFile);
                        }
                      }}
                    />
                    <button type="button" className="selectImg text-white">
                      <label htmlFor="files" className="text-white fw-semibold">
                        Select Image
                      </label>
                    </button>
                    {Image && (
                      <input
                        type="button"
                        value="Save"
                        onClick={save}
                        className=" btnSave mt-2"
                      />
                    )}
                  </form>
                </div>
                <h5 className="profile-name">{userData.Name}</h5>
                <p className="text-muted profile-role">Student</p>
                <div className="button-group">
                  <button className="actionBtn text-white">
                    <Link className="text-white" to="/chat">
                      Chat
                    </Link>
                  </button>
                  <button className="actionBtn" onClick={handleRemoveCookie}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-lg-9 col-md-8">
            <div className="profile-info card shadow-lg">
              <div className="cardheader">
                <h4 className="profile-info-title">Profile Information</h4>
                <i
                  className="fa fa-pen fa-xs float-end edit-icon"
                  onClick={editHandler}
                ></i>
              </div>
              <div className="card-body">
                <table className="table table-bordered profile-table">
                  <tbody>
                    <tr>
                      <td className="fw-bold">Full Name</td>
                      <td>{userData.Name}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Email</td>
                      <td>{userData.Email}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Address</td>
                      <td>{userData.Address}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Age</td>
                      <td>{userData.Age}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Class</td>
                      <td>{userData.StudentClass}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Phone</td>
                      <td>{userData.Phone}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpdatePopup trigger={trigger} setTrigger={setTrigger}>
        {/* Update form content */}
      </UpdatePopup>
      <Footer />
    </>
  );
};

export default MyProfile;
