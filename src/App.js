import React, { Component } from 'react';
import './App.css';
import QuaxObject from "./QuaxObject.jsx"
import PatchCable from "./PatchCable.js"
import './index.css'
import { createStore } from 'redux'
import { addCable } from './actions.js'
import quaxApp from './reducers'
const store = createStore(quaxApp)

// Log the initial state
// console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(addCable());

class App extends Component {
    constructor(props)
    {
        super(props);
        this.state = {patchCables: {}, patchCableActive: false};

        this.createNewPatchCable = this.createNewPatchCable.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.mouseMoved = this.mouseMoved.bind(this);

    }

  createNewPatchCable(x, y)
  {
      this.state.patchCableActive = true;
      this.setState({patchCableActive: true})
      this.state.patchCables[new Date().getTime()] = {
          startPos: {
              x: x,
              y: y,
          },

          endPos:{
              x: 100,
              y: 100
          }
      }
      this.setState({patchCables:  this.state.patchCables});
  }

  mouseMoved(e)
  {
      console.log("moved...");
      if (this.state.patchCableActive)
      {

      }
  }

  handleKeyPress(e){
      if (e.key == 'n' || e.key == 'N')
        console.log("new object created...");
  }

  render() {
      var patchCables = [];
      for (var i in this.state.patchCables)
      {
          var currentCable = this.state.patchCables[i];
          patchCables.push (<PatchCable
              x1 = {currentCable.startPos.x}
              y1 = {currentCable.startPos.y}
              x2 = {currentCable.endPos.x  }
              y2 = {currentCable.endPos.y  }
        />);
      }

    return (
      <div className="App" tabIndex="0" onMouseMove={this.mouseMoved} onKeyDown={this.handleKeyPress}>
          <QuaxObject newPatchCableFn={this.createNewPatchCable}/>,
          <QuaxObject newPatchCableFn={this.createNewPatchCable}/>,

              {patchCables}
      </div>
    );
  }

}

export default App;
