import React, { useEffect, useState } from "react"
import axios from "axios"

const AllResults = () => {
  const [results, setResults] = useState([])

  useEffect(() => {
    const getALlResults = async () => {
      try {
        const res = await axios.get("/api/allResults")
        console.log(res)
        setResults(res.data);
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

export default AllResults;
