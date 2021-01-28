import React from "react";
import { NavLink, Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="logo">
          <Link to="/dashboard" className="simple-text">
            Concept Tester
          </Link>
        </div>
        <ul className="nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/results">
              <i className="nc-icon nc-chart-pie-35"></i>
              <p>Results</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
