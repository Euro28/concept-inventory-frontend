import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import markResults from "./markResults.js";

const ResultsTable = (props) => {
  const [nameFilter, setNameFilter] = useState("");
  const [uniqueConcepts, setUniqueConcepts] = useState([]);

  useEffect(() => {

    const uniqConcepts = props.results
      .reduce((acc, user) => {
        acc.push(Object.keys(user.results));
        return acc;
      }, [])
      .flat();

    setUniqueConcepts([...new Set(uniqConcepts)]);
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
            .filter(({ name }) => name.includes(nameFilter))
            .map(({ results, name }, idx) => {
              return (
                <tr key={name}>
                  <td>{idx}</td>
                  <td>{name}</td>
                  {uniqueConcepts.map((concept) => {
                    const percent = (
                      (results[concept].correct / results[concept].total) *
                      100
                    ).toFixed(2);
                    const colour = percent > 70 ? "green" : "red";
                    return (
                      <td key={concept} style={{ backgroundColor: colour }}>
                        {percent}%
                      </td>
                    );
                  })}
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
