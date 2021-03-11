import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserResultsTable = (props) => {
  return (
    <>
      <Table stripled bordered hover>
        <thead>
          <th>#</th>
          <th>Score</th>
          <th>Concepts Tested</th>
          <th>Link</th>
        </thead>
        <tbody>
          {props.markedResults.map((result, idx) => {
            const total = Object.keys(result).length;
            const score = Object.keys(result).reduce(
              (acc, cur) =>
                acc + result[cur].correct / result[cur].total / total,
              0
            );
            return (
              <tr>
                <td>{idx}</td>
                <td>{(score * 100).toFixed(0)}%</td>
                <td>
                  {JSON.stringify(Object.keys(result))
                    .replace(/['"]+/g, "")
                    .replace(/[\[\]']+/g, "")
                    .replace(/,/g, ", ")}
                </td>
                <td>
                  <Link
                    to={{
                      pathname: "/userResults",
                      state: {
                        userAnswers: props.results[idx],
                        markedResults: result,
                        quizQuestions: props.questions,
                      },
                    }}
                  >
                    <Button> View Results</Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default UserResultsTable;
