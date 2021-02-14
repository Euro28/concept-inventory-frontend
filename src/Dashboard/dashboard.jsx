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

      <Link to={"/takeQuiz"} style={{ textDecoration: "none" }}>
        <Button disabled={user.takenQuiz} variant="primary" size="lg">
          {user.takenQuiz
            ? "Already Taken quiz"
            : "Propositional Logic Concept Test"}
        </Button>
      </Link>
      <Link to={"/changeConcepts"} style={{ textDecoration: "none" }}>
        <Button disabled={!user.takenQuiz} variant="info" size="lg">
          {user.takenQuiz
            ? "Calibrate Concepts"
            : "Take quiz before re-calibration"}
        </Button>
      </Link>

      {user.isAdmin && (
        <Link to={"/results"}>
          <Button variant="success" size="lg" disabled={!user.takenQuiz}>
            {!user.takenQuiz
              ? "Take test first to be able to view results"
              : "View Results"}
          </Button>
        </Link>
      )}
      {user.isAdmin && (
        <Link to={"/makeQuiz"}>
          <Button variant="info" size="lg">
            Edit Concept Inventory
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Dashboard;
