import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import Draggable from 'react-draggable'; // The default
import './QuaxObject.css';
import PatchCable from './PatchCable.js'

import inletOff from '../assets/inlet_off.svg'; // with import
import outletOff from '../assets/outlet_off.svg'; // with import


class Inlet extends Component {
    constructor(props)
    {
        super(props);
        this.getPosition = this.getPosition.bind(this);
        this.state = {
            pos:{
                x: 0,
                y: 0
            }
        };
    }

    handleClick(e)
    {
        var x = ReactDOM.findDOMNode(this).x + ReactDOM.findDOMNode(this).parentNode.getBoundingClientRect().x;
        var y = ReactDOM.findDOMNode(this).y + ReactDOM.findDOMNode(this).parentNode.getBoundingClientRect().y;
        this.props.newPatchCableFn(x, y);
        console.log(x, y);

    }

    getPosition(e)
    {
        console.log("getting inlet position: ");
        this.state.pos.x = ReactDOM.findDOMNode(this).x + ReactDOM.findDOMNode(this).parentNode.getBoundingClientRect().x;
        this.state.pos.y = ReactDOM.findDOMNode(this).y + ReactDOM.findDOMNode(this).parentNode.getBoundingClientRect().y;
    }

    render() {

    return (
            <img ref={this.getPosition} onClick={this.props.newPatchCableFn} onClick={this.handleClick.bind(this)}src={inletOff} style={{width: "10%", margin: "0px"}}></img>
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
        console.log(e);
        this.props.newPatchCableFn(e.clientX, e.clientY);
    }

    render() {

    return (
            <img onClick={this.handleClick} src={outletOff} style={{width: "10%", margin: "0px"}}></img>
    );
  }
}

class QuaxObject extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrag = this.onDrag.bind(this);

        this.state = {
          pos: {
              x: 0,
              y: 0
          }
      }
  }

  onDrag(e)
  {
      this.state.pos.x = e.clientX;
      this.state.pos.y = e.clientY;
      this.setState({pos: {x: this.state.pos.x, y: this.state.pos.y}});
  }

  handleSubmit(event)
  {
    event.preventDefault();
  }

  render() {
      console.log("rendering");
      var left = this.state.pos.x;
      var top = this.state.pos.y;

    return (
        <Draggable onDrag={this.onDrag} enableUserSelectHack={false}>
        <div  className="QuaxObject" style={{zIndex:"100"}}>
        <div className="Inlets">
            <Inlet newPatchCableFn={this.props.newPatchCableFn}/>
            <Inlet newPatchCableFn={this.props.newPatchCableFn}/>
            <Inlet newPatchCableFn={this.props.newPatchCableFn}/>
            <Inlet newPatchCableFn={this.props.newPatchCableFn}/>
        </div>

        <form onSubmit={this.handleSubmit}>
            <input type="text"></input>
        </form>
        <div className="Outlets">
            <Outlet newPatchCableFn={this.props.newPatchCableFn}/>
            <Outlet newPatchCableFn={this.props.newPatchCableFn}/>
            <Outlet newPatchCableFn={this.props.newPatchCableFn}/>
            <Outlet newPatchCableFn={this.props.newPatchCableFn}/>
        </div>

      </div>
      </Draggable>
    );
  }

}

export default QuaxObject;
