import React from "react";
import { render } from "react-dom";
import App from "./js/components/App.jsx";
import './css/index.css'
import { Provider } from 'react-redux'
import store from './js/redux/store/store'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)

