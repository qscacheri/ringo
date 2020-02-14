import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import index from "./js/index.js";
import store from "./js/store/index";
import App from "./js/components/App";

/* eslint-disable */

function handleChange()
{
  // console.log(store.getState());
  
}

store.subscribe(handleChange)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)

