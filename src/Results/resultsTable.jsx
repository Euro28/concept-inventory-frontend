import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const ResultsTable = (props) => {
  const [nameFilter, setNameFilter] = useState("");
  const [uniqueConcepts, setUniqueConcepts] = useState([]);

  useEffect(() => {
    const concepts = [];

    props.results.forEach((user) => {
      Object.keys(user.results).forEach((misconception) =>
        concepts.push(misconception)
      );
    });
    setUniqueConcepts([...new Set(concepts)]);
  }, [props.results]);

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            {uniqueConcepts.map((concept) => (
              <th key={concept}>{concept}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.results
            .filter((user) => user.name.includes(nameFilter))
            .map((user, idx) => {
              const percent = Object.keys(user.results).map(
                (concept) =>
                  (user.results[concept].correct /
                    user.results[concept].total) *
                  100
              );
              return (
                <tr key={user.name}>
                  <td>{idx}</td>
                  <td>{user.name}</td>
                  {percent.map((score) => (
                    <td
                      style={{ backgroundColor: score > 50 ? "green" : "red" }}
                    >
                      {score}%
                    </td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label> Name: </Form.Label>
            <Form.Control
              type="text"
              placeholder="filter name"
              onChange={(e) => setNameFilter(e.target.value)}
              value={nameFilter}
            />
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default ResultsTable;
