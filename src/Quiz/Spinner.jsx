import React from "react";
import Spinner from "react-bootstrap/Spinner";

const centerSpinner = (props) => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={style}>
      <Spinner animation="border" role="status" size="large">
        <span className="sr-only"> Loading...</span>
      </Spinner>
    </div>
  );
};

export default centerSpinner;
