import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../Quiz/Spinner.jsx";
import Toolbar from "../../Dashboard/dashboardToolbar.jsx";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button"

const UserResultsDashboard = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getResults = async () => {
      try {
        const userResults = await axios.get("/api/results");
        setResults(userResults.data);
      } catch (err) {
        setError("Could not retrieve user results please contact Euro ");
      }
    };

    getResults();
    setLoading(false);
  }, []);

  return (
    <div>
      <Toolbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Dashboard for user results</h1>
          <div>
            {results.map((result, idx) => (
              <div key={JSON.stringify(result)}>
                <Link
                  to={{
                    pathname: "/userResults",
                    state: { results: result },
                  }}
                >
                  <Button variant="primary">
                    Result-{idx}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserResultsDashboard;
