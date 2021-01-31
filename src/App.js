import "./App.css";
import Login from "./Login/login.jsx";
import Register from "./Login/register.jsx";
import Dashboard from "./Dashboard/dashboard.jsx";
import Quiz from "./Quiz/quiz.jsx";
import Results from "./Quiz/results.jsx";
import MakeQuiz from "./Quiz/newQuiz/newQuestion.jsx";
import ChangeConcept from "./Concepts/changeConcepts.jsx";
import AllResults from "./Results/allResults.jsx";
import { Redirect, Route, Switch } from "react-router-dom";
//import Main from "./main.jsx";

function App() {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/takeQuiz" component={Quiz} />
        <Route exact path="/results" component={Results} />
        <Route exact path="/makeQuiz" component={MakeQuiz} />
        <Route exact path="/allResults" component={AllResults} />
        <Route exact path="/changeConcepts" component={ChangeConcept} />
        <Redirect from="/" to="/" />
      </Switch>
    </div>
  );
}

export default App;
