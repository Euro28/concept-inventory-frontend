import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const AdminDashboard = () => {
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
            <Card.Title> View All Results </Card.Title>
            <Card.Text>Select The Concept Inventory to review</Card.Text>
            <Link to={"/adminSelectResult"} style={{ textDecoration: "none" }}>
              <Button variant="flat" size="xxl">
                View All Results
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card className="text-center">
          <Card.Body>
            <Card.Title> Edit Concept Inventories </Card.Title>
            <Card.Text>Select which Concept Inventory to Edit</Card.Text>
            <Link to={"/selectSubject"} style={{ textDecoration: "none" }}>
              <Button variant="flat" size="xxl">
                Edit Concept Inventories
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div>
        <Card className="text-center">
          <Card.Body>
            <Card.Title> Create Concept Inventory </Card.Title>
            <Card.Text>
              Create a new Concept Inventory the results of.
            </Card.Text>
            <Link to={"/createQuiz"} style={{ textDecoration: "none" }}>
              <Button variant="flat" size="xxl">
                Create Concept Inventory
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboard;
