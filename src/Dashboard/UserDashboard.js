import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const UserDashboard = () => {
  return (
    <>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: grey;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
      </style>
      <div>
        <Card className="text-center">
          <Card.Body>
            <Card.Title> Take Concept Inventory </Card.Title>
            <Card.Text>
              First You will select what concept inventory to take
            </Card.Text>
            <Link to={"/selectTest"} style={{ textDecoration: "none" }}>
              <Button variant="flat" size="xxl">
                Select Concept Inventory to Take
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card className="text-center">
          <Card.Body>
            <Card.Title> Calibrate Concepts </Card.Title>
            <Card.Text>
              Here you will select what concepts you want to appear on your
              iteration
            </Card.Text>
            <Link to={"/selectConcept"} style={{ textDecoration: "none" }}>
              <Button variant="flat" size="xxl">
                Calibrate Concepts
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card className="text-center">
          <Card.Body>
            <Card.Title> View results </Card.Title>
            <Card.Text>
              You will need to select which concept inventory you want to view
              the results of.
            </Card.Text>
            <Link to={"/selectResult"} style={{ textDecoration: "none" }}>
              <Button variant="flat" size="xxl">
                View Results
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default UserDashboard;
