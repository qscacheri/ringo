import React from "react";
import { render } from "react-dom";
import App from "./js/components/App.jsx";
import './css/index.css'
import Processor from './js/components/Processor'
render(
  <Processor>
    <App />
  </Processor>,

  document.getElementById("root")
)

