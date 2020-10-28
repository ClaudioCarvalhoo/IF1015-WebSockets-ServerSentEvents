import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Route, BrowserRouter as Router } from "react-router-dom";
import ReadOnly from "./ReadOnly";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/read-only" exact component={ReadOnly} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
