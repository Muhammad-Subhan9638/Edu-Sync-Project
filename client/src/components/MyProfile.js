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
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
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
    imageData.append("_id", userData._id);
    imageData.append("file", Image);

    if (Image) {
      try {
        Axios.post("http://localhost:3001/update-img", imageData)
          .then((response) => {
            if (response.status === 200) {
              setUserData(response.data);
              navigate("/myprofile");
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
      <div className="ProfilePage">
        <div className="navbar-top">
          <div className="title">
            <h1>Profile</h1>
          </div>
        </div>
        <div className="SideMain">
          <div className="sidenav">
            <div className="profile">
              {userData.Image?.url ? (
                <img src={userData.Image.url} alt="" width="200" height="200" />
              ) : (
                <img src={userData.Image} alt="" width="200" height="200" />
              )}
              <div>
                <form>
                  <input
                    id="files"
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    onChange={(event) => setImage(event.target.files[0])}
                  />
                  <label htmlFor="files" className="btn">
                    Select Image
                  </label>
                  {Image && (
                    <input
                      type="button"
                      value="Save"
                      onClick={save}
                      id="savebtn"
                    />
                  )}
                </form>
              </div>
              <div className="name">{userData.Name}</div>
              <div className="job">Student</div>
            </div>
            <div className="sidenav-url">
              <div className="url">
                <Link to="" className="active">
                  Profile
                </Link>
                <hr align="center" />
              </div>
            </div>
            <div className="sidenav-url">
              <div className="url">
                <Link to="/chat" className="active">
                  Chat
                </Link>
                <hr align="center" />
              </div>
            </div>
            <div className="sidenav-url">
              <div className="url">
                <Link to="" className="active">
                  <button className="btn" onClick={handleRemoveCookie}>
                    Logout
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="main">
            <h2>IDENTITY</h2>
            <div className="card">
              <div className="card-body">
                <i className="fa fa-pen fa-xs edit" onClick={editHandler}></i>
                <table>
                  <tbody>
                    <tr>
                      <td className="fw-bold">Full Name</td>
                      <td>:</td>
                      <td className="fst-italic">{userData.Name}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Email</td>
                      <td>:</td>
                      <td className="fst-italic">{userData.Email}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Address</td>
                      <td>:</td>
                      <td className="fst-italic">{userData.Address}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Age</td>
                      <td>:</td>
                      <td className="fst-italic">{userData.Age}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Class</td>
                      <td>:</td>
                      <td className="fst-italic">{userData.StudentClass}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Phone</td>
                      <td>:</td>
                      <td className="fst-italic">{userData.Phone}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpdatePopup trigger={trigger} setTrigger={setTrigger}>
        <div className="Auth-form-container py-4">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">UPDATE YOUR INFO</h3>
              <p className="text-center">Email Will not be Update</p>
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
                <div className="mx-2">
                  <div className="form-group mt-3">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      placeholder="address"
                      value={updatedAddress}
                      onChange={(event) =>
                        setUpdatedAddress(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="mx-2">
                  <div className="form-group mt-3">
                    <label>Phone</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      placeholder="e.g 0196xxxxxxx"
                      value={updatedPhone}
                      onChange={(event) => setUpdatedPhone(event.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="mx-2">
                  <div className="form-group mt-3">
                    <label>Age</label>
                    <input
                      type="number"
                      className="form-control mt-1"
                      placeholder="e.g 21"
                      value={updatedAge}
                      onChange={(event) => setUpdatedAge(event.target.value)}
                    />
                  </div>
                </div>
                <div className="mx-2">
                  <div className="form-group mt-3">
                    <label>Class</label>
                    <input
                      type="number"
                      className="form-control mt-1"
                      placeholder="e.g 9"
                      value={updatedStudentClass}
                      onChange={(event) =>
                        setUpdatedStudentClass(event.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  className="btn btn-outline-primary"
                  type="submit"
                  onClick={UpdateData}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </UpdatePopup>
      <Footer />
    </>
  );
};

export default MyProfile;
