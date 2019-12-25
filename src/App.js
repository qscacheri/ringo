import React, { Component } from 'react';
import './App.css';
import QuaxObject from "./QuaxObject.jsx"
import PatchCableList from "./PatchCable.js"
import './index.css'
import { createStore } from 'redux'
import { addCable } from './actions.js'
import quaxApp from './reducers'
const store = createStore(quaxApp)

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(addCable());

class App extends Component {
  render() {
    return (
      <div className="App">
          <QuaxObject newPatchCable={this.createNewPatchCable}/>
      </div>
    );
  }

}

export default App;
