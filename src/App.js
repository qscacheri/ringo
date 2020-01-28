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
  constructor(props) {
    super(props);
    this.state = { patchCables: {}, patchCableActive: -1 };

    this.createNewPatchCable = this.createNewPatchCable.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.mouseMoved = this.mouseMoved.bind(this);
  }

  createNewPatchCable(x, y) {

    if (this.state.patchCableActive != -1) return;

    var id = new Date().getTime();
    this.setState({ patchCableActive: id })
    this.setState(state => {

      const patchCables = state.patchCables;
      patchCables[id] = {
        startPos:
        {
          x,
          y,
        },

        endPos:
        {
          x,
          y
        }
      }

      return {
        patchCables,
      };
    });
  }

  removePatchCable(id) {
    var patchCables = this.state.patchCables;
    for (var patchCableId in patchCables) {
      if (patchCableId == id) {
        delete patchCables[patchCableId];
        this.setState({ patchCables: patchCables })
        return;
      }
    }
  }

  mouseMoved(e) {
    e.persist();

    if (this.state.patchCableActive != -1) {
      var patchCables = this.state.patchCables;
      for (var patchCableId in patchCables) {
        if (patchCableId == this.state.patchCableActive) {
          patchCables[patchCableId].endPos.x = e.clientX;
          patchCables[patchCableId].endPos.y = e.clientY;
        }
      }
      this.setState({ patchCables: patchCables })
    }
  }

  mouseClicked(e) {
    if (this.state.patchCableActive != -1) {
      console.log("parent clicked");

      this.removePatchCable(this.state.patchCableActive)
      this.setState({ patchCableActive: -1 });
    }
  }

  handleKeyPress(e) {
    if (e.key == 'n' || e.key == 'N')
      console.log("new object created...");
  }

  render() {
    const { patchCables } = this.state;
    return (
      <div className="App" tabIndex="0" onMouseMove={this.mouseMoved} onClick={this.mouseClicked.bind(this)} onKeyDown={this.handleKeyPress}>
        <QuaxObject newPatchCableFn={this.createNewPatchCable} />,
          <QuaxObject newPatchCableFn={this.createNewPatchCable} />,
          {
          Object.keys(patchCables).map((key, index) => (
            <PatchCable x1={patchCables[key].startPos.x} y1={patchCables[key].startPos.y}
              x2={patchCables[key].endPos.x} y2={patchCables[key].endPos.y}></PatchCable>
          ))
        }
      </div>
    );
  }

}

export default App;
