import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import "./Dashboard2.css";

export const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className={`dashboard-content ${showMenu ? "with-sidebar" : ""}`}>
        <div className="welcome-section text-center">
          <h1 className="welcome-title">Welcome to Edu-Sync Dashboard</h1>
          <p className="welcome-message">
            Manage your students, teachers, library, and insights seamlessly.
            Explore the charts and data to make informed decisions.
          </p>
          <div className="dashboard-widgets">
            <div className="widget">
              <i className="fa-solid fa-user-graduate"></i>
              <h3>Students</h3>
              <p>View and manage student data.</p>
            </div>
            <div className="widget">
              <i className="fa-solid fa-chalkboard-teacher"></i>
              <h3>Teachers</h3>
              <p>View and manage teacher data.</p>
            </div>
            <div className="widget">
              <i className="fa-solid fa-book"></i>
              <h3>Library</h3>
              <p>Access and organize library resources.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
