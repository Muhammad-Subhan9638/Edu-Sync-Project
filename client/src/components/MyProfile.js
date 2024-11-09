import React, { useEffect, useState, useContext } from "react";
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
  const [trigger, setTrigger] = useState();
  const [updatedName, setUpdatedName] = useState("");
  const [Image, setImage] = useState(null);
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [updatedStudentClass, setUpdatedStudentClass] = useState("");
  const [updatedAge, setUpdatedAge] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]); // Ensure this is correctly destructured

  const UpdatedData = {
    _id: userData._id,
    Name: updatedName,
    Email: userData.Email,
    Phone: updatedPhone,
    Address: updatedAddress,
    StudentClass: updatedStudentClass,
    Age: updatedAge,
  };

  useEffect(() => {
    const callMyprofile = function () {
      try {
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
            let Data = response.data;
            setUserData(Data);
            if (Data.TeachingExperience) {
              navigate("/teacherprofile");
            } else if (Data.UserName) {
              navigate("/dashboard");
            } else {
              navigate("/myprofile");
            }
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    callMyprofile();
  }, [navigate]);

  const alert = (text) => toast(text);

  const editHandler = () => setTrigger(true);

  async function handleRemoveCookie() {
    try {
      await removeCookie("token"); // This should work now
      localStorage.removeItem("role");
      dispatch({ type: state, payload: false });
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
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
          .catch((err) => console.log(err));
      } catch (err) {
        console.error(err);
      }
    }
  }

  const save = () => {
    const imageData = new FormData();
    imageData.append("_id", userData._id); // Ensure userId is correctly appended
    imageData.append("file", Image); // Append the image file here

    if (Image) {
      try {
        Axios.post("http://localhost:3001/update-img", imageData, {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure this header is set for image uploads
          },
        })
          .then((response) => {
            if (response.status === 200) {
              setUserData(response.data); // Update user data after successful upload
              navigate("/myprofile"); // Redirect or update the page
            } else {
              alert("Your Data Didn't Update!");
            }
          })
          .catch((error) => console.error(error));
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Please Upload Your Profile Pic");
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="profile-page container-fluid py-5">
        <div className="row">
          {/* Left Sidebar */}
          <div className="col-lg-3 col-md-4">
            <div className="profile-card card shadow-lg">
              <div className="card-body text-center">
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
                <div>
                  <form onSubmit={(e) => e.preventDefault()}>
                    {" "}
                    {/* Prevent default form submission */}
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
                  <button className="actionBtn " onClick={handleRemoveCookie}>
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
        <div className="auth-form-container py-4">
          <form className="auth-form">
            <div className="auth-form-content">
              <h3 className="auth-form-title">UPDATE YOUR INFO</h3>
              <p className="text-center">Email Will not be Updated</p>
              <div className="form-group mt-3 mx-2">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g Jane Doe"
                  value={updatedName}
                  onChange={(event) => setUpdatedName(event.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between">
                <div className="form-group mt-3 mx-2">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="e.g 9876543210"
                    value={updatedPhone}
                    onChange={(event) => setUpdatedPhone(event.target.value)}
                  />
                </div>
                <div className="form-group mt-3 mx-2">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="e.g 24st Road"
                    value={updatedAddress}
                    onChange={(event) => setUpdatedAddress(event.target.value)}
                  />
                </div>
              </div>
              <div className="form-group mt-3 mx-2">
                <label>Class</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g 11th"
                  value={updatedStudentClass}
                  onChange={(event) =>
                    setUpdatedStudentClass(event.target.value)
                  }
                />
              </div>
              <div className="form-group mt-3 mx-2">
                <label>Age</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g 20"
                  value={updatedAge}
                  onChange={(event) => setUpdatedAge(event.target.value)}
                />
              </div>
              <button
                className="btn btn-success update-btn mt-3"
                onClick={UpdateData}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </UpdatePopup>
      <Footer />
    </>
  );
};

export default MyProfile;
