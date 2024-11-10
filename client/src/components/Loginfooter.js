import React from "react";
import { Link } from "react-router-dom";
import "./Loginfooter.css";
export const Loginfooter = () => {
  let styling = {
    background_color: "rgba(0, 0, 0, 0.025)",
  };
  return (
    <footer className="text-center text-lg-start bg-light text-muted footerPosition ">
      <div className="text-center footer p-3" style={styling}>
        © 2024 Copyright:
        <Link className="text-reset fw-bold" to="/">
          {" "}
          Edu-Sync.com{" "}
        </Link>
      </div>
    </footer>
  );
};
