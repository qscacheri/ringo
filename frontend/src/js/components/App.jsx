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
import h2tml2canvas from 'html2canvas'

function App() {
  let myRef = useRef(null);
  const generateThumbnail = async () => {
    if (!myRef) return
    h2tml2canvas(myRef.current).then((c) => {
        const imgData = c.toDataURL('image/png')
        console.log(imgData);
        
        setCanvas(imgData)                
    })

}

  useEffect(() => {
    
  }, []);

  return (
    <div className="App" ref={myRef} onClick={() => generateThumbnail()}>
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
