import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import teacherslistpic from "../images/teacherslistpic.png"; // Import image
import "./TeachersList.css";

const TeachersList = () => {
  const [ListOfTeachers, setListOfTeachers] = useState([]);
  const [filteredList, setFilterList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    TeachersList();
  }, []);

  function mySearchFunctionEducation(value) {
    const results = ListOfTeachers.filter((education) =>
      education.Education.replace(/ /g, "")
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    if (value !== "") {
      setListOfTeachers(results);
      if (results.length === 0) {
        setShow(true);
      }
    } else {
      TeachersList();
      setShow(false);
    }
  }

  function mySearchFunctionSubject(value) {
    const results = ListOfTeachers.filter((education) =>
      education.TeachingSubject.replace(/ /g, "")
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    if (value !== "") {
      setListOfTeachers(results);
    } else {
      TeachersList();
    }
  }

  const TeachersList = async function () {
    Axios.get("http://localhost:3001/all-teachers").then((results) => {
      let teachers = results.data;
      setListOfTeachers(teachers);
      setFilterList(teachers);
    });
  };

  useEffect(() => {
    if (ListOfTeachers.length > 0) {
      disticntObject();
    }
  }, [ListOfTeachers]);

  function disticntObject() {
    let result = [];
    const key = "TeachingSubject";
    const arrayUniqueByKey = [
      ...new Map(filteredList.map((item) => [item[key], item])).values(),
    ];
    if (arrayUniqueByKey.length > 0) {
      setSubjectList(arrayUniqueByKey);
    }
  }

  function handleSort(teacher) {
    let result = [];
    filteredList.forEach((items) => {
      if (teacher.TeachingSubject === items.TeachingSubject) {
        result.push(items);
      }
    });
    setListOfTeachers(result);
  }

  return (
    <>
      <Navbar />
      <div className="teacherlist">
        <div
          className="TeachersListBanner text-center"
          style={{
            backgroundImage: `url(${teacherslistpic})`,
          }}
        >
          <h1>Teachers List</h1>
        </div>

        <div className="row">
          <div className="leftbar col-lg-3 col-md-4 col-sm-12 p-4">
            <h4 className="mb-4">Tags for Search Teachers</h4>
            <div onClick={TeachersList} className="subjects">
              All Subject Teachers
            </div>
            {subjectList.map((teacher, index) => (
              <div
                key={index}
                className="subjects"
                onClick={() => handleSort(teacher)}
              >
                {teacher.TeachingSubject}
              </div>
            ))}
          </div>

          <div className="teacher-sidebar col-lg-9 col-md-8 col-sm-12">
            <div className="d-flex justify-content-center mb-4">
              <div className="form-group mx-1 col-sm-3">
                <input
                  className="form-control search-input"
                  placeholder="Teacher search by Education"
                  onChange={(e) => mySearchFunctionEducation(e.target.value)}
                />
              </div>
              <div className="form-group mx-1 col-sm-3">
                <input
                  className="form-control search-input"
                  placeholder="Teacher search by Subject"
                  onChange={(e) => mySearchFunctionSubject(e.target.value)}
                />
              </div>
            </div>

            <div className="teachers-container">
              {ListOfTeachers.map((val, index) => {
                const ProfileLink = `/teacherslist/${val._id}`;
                return (
                  <Link
                    key={val._id}
                    to={ProfileLink}
                    className="teacher-card-link"
                  >
                    <div className="teacher-card">
                      <div className="teacher-card-content">
                        <div className="pic-container">
                          {val.Image.url ? (
                            <img
                              className="pic-tlist"
                              src={val.Image.url}
                              alt={val.Name}
                            />
                          ) : (
                            <img
                              className="pic-tlist"
                              src={val.Image}
                              alt={val.Name}
                            />
                          )}
                        </div>
                        <div className="detail">
                          <h3 className="name">{val.Name}</h3>
                          <h6 className="education">{val.Education}</h6>
                          <p className="description">{val.Description}</p>
                          <p className="teachingSubject">
                            {val.TeachingSubject}
                          </p>
                          <div className="d-flex">
                            <div className="gender">
                              <b>Gender:</b> {val.Gender}
                            </div>
                            <div className="age">
                              <b>Age:</b> {val.Age}
                            </div>
                          </div>
                          <div>
                            <div className="experience">
                              <b>Online Teaching Experience:</b>{" "}
                              {val.OnlineTeachingExperience}
                            </div>
                            <div className="experience">
                              <b>Physical Teaching Experience:</b>{" "}
                              {val.TeachingExperience}
                            </div>
                          </div>
                          <div className="teacher-card-footer">
                            <div className="phone">
                              <b>Phone:</b> {val.Phone}
                            </div>
                            <div className="email">
                              <b>Email:</b> {val.Email}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeachersList;
