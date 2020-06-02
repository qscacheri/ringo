/* eslint-disable */

import React, { useState, useEffect, useRef, useContext } from "react";
import "../../css/App.css";
import Header from "./Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import About from "./About";
import Workspace from "./Workspace";
import LoginSignup from "./LoginSignup";
import Processor from './Processor'

function App() {
  let myRef = useRef(null);

  useEffect(() => {

  }, []);

  return (
    <div className="App" ref={myRef}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login-signup" />
          </Route>
          <Route exact path="/login-signup">
            <LoginSignup />
          </Route>
          <Route exact path="/workspace">
            <div>
              <Processor>
                <Workspace />
              </Processor>
            </div>
          </Route>
          <Route exact path="/about">
            <div>
              <About />
            </div>
          </Route>
          <Route exact path="/loginsignup">
            <div>
              <LoginSignup />
            </div>
          </Route>
        </Switch>
      </Router>
      <Header />
    </div>
  );
}

export default App;
