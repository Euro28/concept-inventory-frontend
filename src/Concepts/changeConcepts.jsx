import React, {useEffect, useState} from "react";
import axios from "axios"

const ChangeConcept = () => {
  const [concepts, setConcepts] = useState([])

  useEffect(() => {
    const getConcepts = async () => {
      const concept = await axios.get("/api/concepts")

      setConcepts(Object.keys(concept.data))
    }

    getConcepts();

  }, [])

  return (
    <div>
      <h1>Change concept page</h1>
    </div>
  );
};

export default ChangeConcept;
