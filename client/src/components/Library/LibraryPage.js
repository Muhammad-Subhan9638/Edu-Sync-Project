import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import img1 from "../../images/11.png";
import img2 from "../../images/12.png";
import img3 from "../../images/13.png";
import img4 from "../../images/14.png";
import img5 from "../../images/15.png";
import "./LibraryPage.css"; // Import the custom CSS file

const LibraryPage = () => {
  useEffect(() => {}, []);

  const [ListOfClass, setListOfClass] = useState([
    { _id: 1, Name: "9th", img: img1 },
    { _id: 2, Name: "10th", img: img2 },
    { _id: 3, Name: "11th", img: img3 },
    { _id: 4, Name: "12th", img: img4 },
    { _id: 5, Name: "University Level", img: img5 },
  ]);

  return (
    <>
      <Navbar />
      <div className="library-banner LibraryBanner d-flex align-items-center justify-content-center">
        <h1 className="text-center text-white">Our Library</h1>
      </div>
      <div id="cards_landscape_wrap-2">
        <div className="container py-5">
          <div className="row justify-content-center">
            {ListOfClass.map((Class) => {
              const route = "/library/" + Class.Name;
              return (
                <div
                  key={Class._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <div className="card library-card shadow-sm">
                    <img
                      src={Class.img}
                      className="card-img-top rounded-top"
                      alt={Class.Name}
                    />
                    <div className="card-body d-flex flex-column align-items-center">
                      <h5 className="card-title mb-3">{Class.Name}</h5>
                      <a
                        href={route}
                        className="btn btn-dark text-white mt-auto"
                      >
                        Check books
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LibraryPage;
