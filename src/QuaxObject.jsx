import React, { Component } from 'react';
import Draggable from 'react-draggable'; // The default
import './QuaxObject.css';
import PatchCable from './PatchCable.js'

import inletOff from '../assets/inlet_off.svg'; // with import
import outletOff from '../assets/outlet_off.svg'; // with import


class PatchCableList extends Component {
    constructor()
    {
        super();
        this.state.patchCables = {}
        // this.props.audioNode =
    }
    render(){
        return (Object.keys(this.props.fruits).map(function(key) {
                  return <PatchCable
                    x1={this.state.patchCables[key].state.startPos.x}
                    y1={this.state.patchCables[key].state.startPos.y}
                    x2={this.state.patchCables[key].state.startPos.x}
                    y2={this.state.patchCables[key].state.startPos.x}>
                        </PatchCable>
                }.bind(this))
            )
        }
    }

class Inlet extends Component {
    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e)
    {
        // this.props.inletClicked();
    }

    render() {

    return (
            <img src={inletOff} style={{width: "10%", margin: "0px"}}></img>
    );
  }
}

class Outlet extends Component {
    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e)
    {
        // this.props.inletClicked();
    }

    render() {

    return (
            <img src={outletOff} style={{width: "10%", margin: "0px"}}></img>
    );
  }
}

class QuaxObject extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          message: "Mouse Event",
          isDragging: false,
          pos: {
              x: 0,
              y: 0
          }
      }
  }

  handleSubmit(event)
  {
    event.preventDefault();
    }

  render() {
      var left = this.state.pos.x;
      var top = this.state.pos.y;

    return (
        <Draggable enableUserSelectHack={false}>
        <div className="QuaxObject">
        <div className="Inlets">
            <Inlet obj={this}/>
            <Inlet obj={this}/>
            <Inlet obj={this}/>
            <Inlet obj={this}/>
        </div>

        <form onSubmit={this.handleSubmit}>
            <input type="text"></input>
        </form>
        <div className="Outlets">
            <Outlet obj={this}/>
            <Outlet obj={this}/>
            <Outlet obj={this}/>
            <Outlet obj={this}/>
        </div>

      </div>
      </Draggable>
    );
  }

}

export default QuaxObject;
