import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Navigation from "./components/Navigation/Navigation";
// import { ThemeProvider } from "@material-ui/core";
// import { theme } from './theme';
require("./global");

function App() {
  return (
    // <ThemeProvider theme={theme}>
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
    // </ThemeProvider>
  );
}

export default App;
