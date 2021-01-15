import React from "react";

const enteredAnswers = (props) => {

  return (
    <>
    {props.answers.map((answer) => (
      <li key={answer.text}>
      {answer.value}- {answer.text} {String(answer.correct)}
      </li>
    ))}
    </>
  )
}

export default enteredAnswers;
