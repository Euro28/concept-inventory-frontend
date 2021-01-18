import React from "react";
import Modal from "react-bootstrap/Modal";

const ConceptResult = (props) => {
  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title> {props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Results: {props.score.correct} / {props.score.total}
        </p>
      </Modal.Body>

      <Modal.Footer>Footer</Modal.Footer>
    </Modal.Dialog>
  );
};

export default ConceptResult;
