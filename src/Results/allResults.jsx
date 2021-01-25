import React, { useEffect, useState } from "react"
import axios from "axios"

const allResults = () => {
  const [results, setResults] = useState([])

  useEffect(() => {
    const getALlResults = async () => {
      try {
        const results = await axios.get("/api/allResults")
        setResults(resuts.data);
      } catch (err) {
        console.log(err);
      }
    }
    getALlResults();
  }, [])

  return (
    <div> {JSON.stringify(results)}</div>
  )
}

export default allResults;
