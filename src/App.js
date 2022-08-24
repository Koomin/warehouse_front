import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Navigation from "./components/Navigation/Navigation";
require("./global");

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route>
          <Navigation />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
