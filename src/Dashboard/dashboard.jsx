import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardToolbar from "./dashboardToolbar.jsx";
import UserDashboard from "./UserDashboard.js";
import AdminDashboard from "./AdminDashboard.js";

const Dashboard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedIn = async () => {
      const user = await axios.post("/api/login");
      if (user.status === 200) {
        setUser(user.data.user);
      }
    };
    loggedIn();
  }, []);

  return (
    <div>
      <DashboardToolbar />
      {user.isAdmin ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
