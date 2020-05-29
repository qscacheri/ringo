import React from "react";
import { render } from "react-dom";
import App from "./js/components/App.jsx";
import './css/index.css'
import Processor from './js/components/Processor'
import PatchCableManager from './js/components/PatchCableManager'
render(

  <Processor>
    <App />
  </Processor>,

  document.getElementById("root")
)

