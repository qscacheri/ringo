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
        this.state = {patchCables: [], patchCableActive: false};

        this.createNewPatchCable = this.createNewPatchCable.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.mouseMoved = this.mouseMoved.bind(this);
    }

  createNewPatchCable(x, y)
  {

      this.setState({patchCableActive: true})
      this.setState(state => {
        const patchCables = state.patchCables.concat({
            startPos:
            {
                x,
                y,
            },

            endPos: 
            {
                x: 100, 
                y: 100
            }
        })

        return {
          patchCables,
        };
      });
      
      
  }

  mouseMoved(e)
  {   
      e.persist();

      if (this.state.patchCableActive)
      {
        this.setState(state => {
            const patchCables = state.patchCables.map((item, j) => {
                item.endPos.x = e.clientX;
                item.endPos.y = e.clientY;
                return item;
            });
            return {
                patchCables,
            };
          });
        }
    }
  handleKeyPress(e){
      if (e.key == 'n' || e.key == 'N')
        console.log("new object created...");
  }

  render() {
    //   console.log(this.state);
      
    return (
      <div className="App" tabIndex="0" onMouseMove={this.mouseMoved} onKeyDown={this.handleKeyPress}>
          <QuaxObject newPatchCableFn={this.createNewPatchCable}/>,
          <QuaxObject newPatchCableFn={this.createNewPatchCable}/>,
            {this.state.patchCables.map(patchCable => (                
            <PatchCable x1={patchCable.startPos.x}  y1={patchCable.startPos.y} x2={patchCable.endPos.x}  y2={patchCable.endPos.y}></PatchCable>
          ))}

      </div>
    );
  }

}

export default App;
