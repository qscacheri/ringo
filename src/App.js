import React, { Component } from 'react';
import './App.css';
import QuaxObject from "./QuaxObject.jsx"
import IOLet from './IOLet.jsx'
import PatchCable from "./PatchCable.js"
import './index.css'
import { createStore } from 'redux'
import { newConnection } from './actions/actions.js'
import quaxApp from './reducers/reducers.js'
import './QuaxCommon.js'

const store = createStore(quaxApp)

// Log the initial state
// console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() => console.log(store.getState()))


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patchCables: {},
      activePatchCableState:
      {
        id: -1,
        connectionType: IOLet.IOLetType.In
      }
    };

    this.createNewPatchCable = this.createNewPatchCable.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.mouseMoved = this.mouseMoved.bind(this);
  }

  createNewPatchCable(type, x, y) {

    if (this.state.activePatchCableState.id != -1) return;

    var id = new Date().getTime();
    const activePatchCableState = this.state.activePatchCableState;
    activePatchCableState.id = id;
    activePatchCableState.connectionType = type;


    this.setState({ activePatchCableState: activePatchCableState });
    this.setState(state => {

      const patchCables = state.patchCables;
      patchCables[id] = {
        x1: x,
        y1: y,
        x2: x,
        y2: y
      }

      return {
        patchCables,
      };
    });
  }

  createNewObject(x, y)
  {
    var newObject = 
    {
      type: QuaxObject.ObjectTypes.Blank
    };
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

    if (this.state.activePatchCableState.id != -1) {
      var patchCables = this.state.patchCables;
      for (var patchCableId in patchCables) {
        if (patchCableId == this.state.activePatchCableState.id) {
          patchCables[patchCableId].x2 = e.clientX;
          patchCables[patchCableId].y2 = e.clientY;
        }
      }
      this.setState({ patchCables: patchCables })
    }
  }

  mouseClicked(e) {
    if (this.state.activePatchCableState.id != -1) {

      this.removePatchCable(this.state.activePatchCableState.id)
      const activePatchCableState = this.state.activePatchCableState;
      activePatchCableState.id = -1;
      this.setState({ activePatchCableState: activePatchCableState });
    }
  }

  handleKeyPress(e) {
    if (e.key == 'n' || e.key == 'N')
  }

  render() {
    const { patchCables } = this.state;
    return (
      <div className="App" tabIndex="0" onMouseMove={this.mouseMoved} onClick={this.mouseClicked.bind(this)} onKeyDown={this.handleKeyPress}>
        <QuaxObject newPatchCableFn={this.createNewPatchCable} activePatchCableState={this.state.activePatchCableState} />,
        <QuaxObject newPatchCableFn={this.createNewPatchCable} activePatchCableState={this.state.activePatchCableState} />,
          {
          Object.keys(patchCables).map((key, index) => (
            <PatchCable key x1={patchCables[key].x1} y1={patchCables[key].y1}
              x2={patchCables[key].x2} y2={patchCables[key].y2}></PatchCable>
          ))
        }
      </div>
    );
  }

}

export default App;
