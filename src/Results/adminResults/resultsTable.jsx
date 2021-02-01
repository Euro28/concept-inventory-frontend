import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const ResultsTable = (props) => {
  const [nameFilter, setNameFilter] = useState("");

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Username</th>
            {props.concepts.map((concept) => (
              <th key={concept}>{concept}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {props.results
            .filter(({ name }) => name.includes(nameFilter))
            .map(({ results, name }, idx) => {
              const rows = results.map((result) => {
                return (
                  <tr key={JSON.stringify(result)}>
                    <td>{name}</td>
                    {props.concepts.map((concept) => {
                      if (Object.keys(result).includes(concept)) {
                        const percent = (
                          (result[concept].correct / result[concept].total) *
                          100
                        ).toFixed(2);
                        const colour = percent > 65 ? "green" : "red";
                        return (
                          <td
                            style={{ backgroundColor: colour }}
                            key={`${JSON.stringify(result)} ${concept}`}
                          >
                            {percent}
                          </td>
                        );
                      } else {
                        return (
                          <td key={`${JSON.stringify(result)} ${concept}`} />
                        );
                      }
                    })}
                  </tr>
                );
              });
              return rows;
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
