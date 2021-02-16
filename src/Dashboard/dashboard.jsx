import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";

import DashboardToolbar from "./dashboardToolbar.jsx";
import Button from "react-bootstrap/Button";

const Dashboard = () => {
  const history = useHistory();
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

      <Link to={"/selectTest"} style={{ textDecoration: "none" }}>
        <Button disabled={user.takenQuiz} variant="primary" size="lg">
          {user.takenQuiz ? "Already Taken quiz" : "Take Concept Test"}
        </Button>
      </Link>
      <Link to={"/selectConcept"} style={{ textDecoration: "none" }}>
        <Button disabled={!user.takenQuiz} variant="info" size="lg">
          {user.takenQuiz
            ? "Calibrate Concepts"
            : "Take quiz before re-calibration"}
        </Button>
      </Link>

      {user.isAdmin && (
        <Link to={"/adminSelectResult"}>
          <Button variant="success" size="lg">
            All Results
          </Button>
        </Link>
      )}
      {user.isAdmin && (
        <Link to={"/selectSubject"}>
          <Button variant="info" size="lg">
            Edit Concept Inventory
          </Button>
        </Link>
      )}
      {user.isAdmin && (
        <Link to={"/createQuiz"}>
          <Button variant="primary" size="lg">
            Create New Concept Inventory
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Dashboard;
