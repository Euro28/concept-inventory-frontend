import React from "react";
import Table from "react-bootstrap/Table";

const ResultsTable = (props) => {
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Username</th>
            <th>Class</th>
            {props.concepts.map((concept) => (
              <th key={concept}>{concept}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {props.results
            .filter(({ name }) => name.includes(props.nameFilter))
            .filter(({ name, userClass }) =>
              userClass.includes(props.classFilter)
            )
            .map(({ results, name, userClass }) => {
              const rows = results.map((result) => {
                return (
                  <tr key={JSON.stringify(result)}>
                    <td>{name}</td>
                    <td>{userClass}</td>
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
    </>
  );
};

export default ResultsTable;
