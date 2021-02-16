import "./App.css";
import Login from "./Login/login.jsx";
import Register from "./Login/register.jsx";
import Dashboard from "./Dashboard/dashboard.jsx";
import Quiz from "./Quiz/quiz.jsx";
import Results from "./Results/userResults/userResultsDashboard.jsx";
import MakeQuiz from "./Quiz/newQuiz/newQuestion.jsx";
import ChangeConcept from "./Concepts/changeConcepts.jsx";
import AllResults from "./Results/adminResults/allResults.jsx";
import { Redirect, Route, Switch } from "react-router-dom";
import UserResults from "./Results/userResults/results.jsx";
import CreateQuiz from "./Quiz/createQuiz/createQuiz.jsx";
import EditDashboard from "./Quiz/editQuizDashboard.jsx";
import TestDashboard from "./Quiz/takeQuizDashboard.jsx";
import ConceptDashboard from "./Concepts/conceptsDashboard.jsx";
import SelectResult from "./Results/selectUserResults.jsx";
import AdminSelectResult from "./Results/adminResults/adminResultsDashboard.jsx"
function App() {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/takeQuiz" component={Quiz} />
        <Route exact path="/results" component={Results} />
        <Route exact path="/userResults" component={UserResults} />
        <Route exact path="/makeQuiz" component={MakeQuiz} />
        <Route exact path="/allResults" component={AllResults} />
        <Route exact path="/changeConcepts" component={ChangeConcept} />
        <Route exact path="/createQuiz" component={CreateQuiz} />
        <Route exact path="/selectSubject" component={EditDashboard} />
        <Route exact path="/selectTest" component={TestDashboard} />
        <Route exact path="/selectConcept" component={ConceptDashboard} />
        <Route exact path="/selectResult" component={SelectResult} />
        <Route exact path="/adminSelectResult" component={AdminSelectResult}/>
        <Redirect from="/" to="/" />
      </Switch>
    </div>
  );
}

export default App;
