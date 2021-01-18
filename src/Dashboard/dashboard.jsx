import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";

import DashboardToolbar from "./dashboardToolbar.jsx";
import Button from "react-bootstrap/Button";

const Dashboard = () => {
  //retrieve the user from given id and check if they have taklen quiz if they have then dont let them takd quiz again
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

  const logout = async () => {
    Cookies.remove("name");
    history.push("/");
  };

  return (
    <div>
      <DashboardToolbar logout={logout} />
      {!user.takenQuiz ? (
        <Link to={"/takeQuiz"}>
          <Button variant="primary" size="lg" block>
            Take concept inventory
          </Button>
        </Link>
      ) : (
        <Button variant="secondary" size="lg" block disabled>
          You have already taken the concept inventory
        </Button>
      )}
      <Link to={"/results"}>
        <Button variant="success" size="lg" block>
          View Results
        </Button>
      </Link>
      <Link to={"/makeQuiz"}>
        <Button variant="dark" size="lg" block>
          Create Concept Inventory
        </Button>
      </Link>
      Thank you for taking the concept inventory !
    </div>
  );
};

export default Dashboard;
