import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import JobState from "./context/jobs/JobState";
import StatementState from "./context/statement/StatementState";
import AuthState from "./context/auth/AuthState";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <JobState>
        <StatementState>
          <Router>
            <Fragment>
              <Navbar />
            </Fragment>
          </Router>
        </StatementState>
      </JobState>
    </AuthState>
  );
};

export default App;
