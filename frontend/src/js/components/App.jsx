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
import MyPatches from "./MyPatches";
const axios = require('axios')
axios.defaults.baseURL = process.env.REACT_APP_SERVER_ADDRESS;

export const AppContext = React.createContext()
const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

function App() {
  const [username, setUsername] = useState(null)
  const [token, setToken] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [initializing, setInitializing] = useState(true)

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
    const storedToken = localStorage.getItem('token')
    console.log(storedToken);
    
    if (storedToken !== null) {
        const config = {headers: { Authorization: `Bearer ${storedToken}` }}
        axios.post(`${serverAddress}/validate-token`, {}, config).then((res) => {
            if (res.data.username) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                setUsername(res.username)
                setToken(storedToken)
                setLoggedIn(true)
                setInitializing(false)
            }
        }).catch((err) => console.log(err))
    }
}, []);

  const value = {
    username,
    setUsername, 
    token, 
    setToken,
    loggedIn,
    setLoggedIn
  }

  if (initializing) return null

  return (
    <AppContext.Provider value={value}>
    <div className="App" ref={myRef}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login-signup" />
          </Route>
          <Route exact path="/login-signup">
            <LoginSignup />
          </Route>
          <Route exact path="/my-patches">
            <MyPatches />
          </Route>
          <Route path="/patch">
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
    </AppContext.Provider>
  );
}

export default App;
