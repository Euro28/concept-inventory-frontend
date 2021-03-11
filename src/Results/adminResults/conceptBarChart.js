import React, { useEffect, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const ConceptBarChart = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let formattedResults = props.concepts.map((concept) => ({
      concept: concept,
      correct: 0,
      total: 0,
    }));

    props.results
      .filter((user) => user.userClass.includes(props.classFilter))
      .filter((user) => user.name.includes(props.nameFilter))
      .forEach((user) => {
        user.results.forEach((result) => {
          for (let concept in result) {
            if (Object.prototype.hasOwnProperty.call(result, concept)) {
              const res = formattedResults.filter(
                (obj) => obj.concept === concept
              );
              const referenceToResult = res[0];
              referenceToResult.correct += result[concept].correct;
              referenceToResult.total += result[concept].total;
            }
          }
        });
      });

    formattedResults = formattedResults.map((result) => ({
      concept: result.concept,
      score: ((result.correct / result.total) * 100).toFixed(0),
    }));

    setData(formattedResults);
  }, [props.nameFilter, props.classFilter]);

  return (
    <div style={{ margin: "auto", width: "50%" }}>
      <BarChart width={738} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey="concept" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="score" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ConceptBarChart;
