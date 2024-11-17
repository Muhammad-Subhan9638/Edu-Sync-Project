import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Sidebar } from "./Sidebar";
import UpdatePopup from "../../components/UpdatePopup";
import { BrowserCookie } from "../../helpers/BrowserCookies";
import { AdminFooter } from "./AdminFooter";

export const AdminProfile = () => {
  const [adminData, setAdminData] = useState("");
  const [Image, setImage] = useState();
  const [trigger, setTrigger] = useState();
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedAge, setUpdatedAge] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [UpdatedPassword, setUpdatedPassword] = useState("");
  const [UpdatedcPassword, setUpdatedcPassword] = useState("");
  const UpdatedData = {
    _id: adminData._id,
    Name: updatedName,
    Email: updatedEmail,
    Phone: updatedPhone,
    Age: updatedAge,
  };
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const UserToken = BrowserCookie();
      const token = UserToken.UserToken;
      Axios.get("http://localhost:3001/admin-dashboard", {
        headers: {
          authorization: `${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          let Data = response.data;
          setAdminData(Data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  async function UpdateData(e) {
    if (!updatedName || !updatedPhone || !updatedAge) {
      e.preventDefault();
      return window.alert("Please Enter all the fields below");
    } else {
      try {
        Axios.put("http://localhost:3001/update-student", UpdatedData)
          .then((response) => {
            if (response.status === 200) {
              window.alert("Success!");
              let Data = response.data;
              setAdminData(Data);
              setTrigger(false);
            } else {
              window.alert("Error!");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.error(err);
      }
    }
  }

  const styleinput = {
    visibility: "hidden",
  };

  const save = (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("_id", adminData._id);
    imageData.append("file", Image);

    if (Image) {
      try {
        Axios.post("http://localhost:3001/update-img", imageData)
          .then((response) => {
            if (response.status === 200) {
              let Data = response.data;
              setAdminData(Data);
              window.alert("Profile picture updated successfully!");
            } else {
              window.alert("Your data didn't update!");
            }
          })
          .catch((error) => {
            console.error(error);
            window.alert("An error occurred while updating the profile picture.");
          });
      } catch (e) {
        console.error(e);
        window.alert("An error occurred. Please try again later.");
      }
    } else {
      window.alert("Please upload your profile picture.");
    }
  };

  async function addNewAdmin() {
    navigate("/dashboard/admin-register");
  }

  const editHandler = function () {
    return setTrigger(true);
  };

  return (
    <>
      <div className="d-flex" style={{ background: "linear-gradient(135deg, #007bff, #6c757d)" }}>
        <Sidebar />
        <div className="container d-flex flex-column mt-5">
          <div>
            <h3>Profile</h3>
          </div>
          <div className="text-left mt-3 w-sm-50 w-md-75 w-lg-100">
            <div className="card">
              <div className="card-body">
                <img src={adminData.Image} alt="" width="200" height="200" />
                <form>
                  <label htmlFor="files" className="btn">
                    Edit
                  </label>
                  <input type="submit" value="Save" onClick={save} id="savebtn" />
                  <input
                    id="files"
                    style={styleinput}
                    type="file"
                    name="file"
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                    }}
                  />
                </form>
                <input
                  className="formbtn mt-5 mx-1 my-4 float-end"
                  type="button"
                  onClick={addNewAdmin}
                  value="Add Admin"
                />
                <i className="fa fa-pen fa-xs edit" onClick={editHandler}></i>
                <table>
                  <tbody>
                    <tr>
                      <td className="fw-bold">Full Name</td>
                      <td>:</td>
                      <td className="fst-italic">{adminData.Name}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Email</td>
                      <td>:</td>
                      <td className="fst-italic">{adminData.Email}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Phone</td>
                      <td>:</td>
                      <td className="fst-italic">{adminData.Phone}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpdatePopup trigger={trigger} setTrigger={setTrigger}>
        <div className="d-flex align-items-center Auth-form-container py-4">
          <form className="Auth-form" style={{ height: "460px" }}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">UPDATE YOUR INFO</h3>
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
                    <label>Phone</label>
                    <input
                      type="number"
                      className="form-control mt-1"
                      placeholder="Phone Number"
                      value={updatedPhone}
                      onChange={(event) => setUpdatedPhone(event.target.value)}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                      type="Password"
                      className="form-control mt-1"
                      placeholder="Password"
                      value={UpdatedPassword}
                      onChange={(event) => setUpdatedPassword(event.target.value)}
                    />
                  </div>
                </div>
                <div className="mx-2">
                  <div className="form-group mt-3">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      placeholder="Email"
                      value={updatedEmail}
                      onChange={(event) => setUpdatedEmail(event.target.value)}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="form-control mt-1"
                      placeholder="Confirm Password"
                      value={UpdatedcPassword}
                      onChange={(event) => setUpdatedcPassword(event.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="d-grid gap-2 mt-3 mx-2">
                <button type="submit" className="formbtn" onClick={UpdateData}>
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </UpdatePopup>

      {/* <AdminFooter /> */}
    </>
  );
};
