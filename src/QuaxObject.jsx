import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import Draggable from 'react-draggable'; // The default
import './QuaxObject.css';
import PatchCable from './PatchCable.js'

import inletOff from '../assets/inlet_off.svg'; // with import
import outletOff from '../assets/outlet_off.svg'; // with import


const IOLetType =
{
    In: 0,
    Out: 1
}

class IOLet extends Component {
    constructor(props) {
        super(props);
        this.getPosition = this.getPosition.bind(this);
        this.state = {
            pos: {
                x: 0,
                y: 0
            }
        };
    }

    handleClick(e) {
        console.log(this.props);
        
        if (this.props.activePatchCableState.id == -1) {
            var x = ReactDOM.findDOMNode(this).x + ReactDOM.findDOMNode(this).parentNode.getBoundingClientRect().x;
            var y = ReactDOM.findDOMNode(this).y + ReactDOM.findDOMNode(this).parentNode.getBoundingClientRect().y;
            this.props.newPatchCableFn(this.props.connectionType, e.clientX, e.clientY);
            e.stopPropagation();
        }

        else if (this.props.activePatchCableState.connectionType == !this.props.connectionType) {
            console.log("connection successful");
        }

        else {
            console.log("connection not successful");
            console.log(this.props.activePatchCableState.connectionType, "->", this.props.connectionType);
        }

    }

    getPosition(e) {
        this.state.pos.x = ReactDOM.findDOMNode(this).x + ReactDOM.findDOMNode(this).parentNode.getBoundingClientRect().x;
        this.state.pos.y = ReactDOM.findDOMNode(this).y + ReactDOM.findDOMNode(this).parentNode.getBoundingClientRect().y;
    }

    render() {
        const sourceImage = this.props.connectionType == IOLetType.In ? inletOff : outletOff
        return (
            <img ref={this.getPosition} onClick={this.props.newPatchCableFn} onClick={this.handleClick.bind(this)} src={sourceImage} style={{ width: "10%", margin: "0px" }}></img>
        );
    }
}

class QuaxObject extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrag = this.onDrag.bind(this);
        console.log(this.props);
        
        this.state = {
            pos: {
                x: 0,
                y: 0
            }
        }
    }

    onDrag(e) {
        this.state.pos.x = e.clientX;
        this.state.pos.y = e.clientY;
        this.setState({ pos: { x: this.state.pos.x, y: this.state.pos.y } });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        var left = this.state.pos.x;
        var top = this.state.pos.y;

        return (
            <Draggable onDrag={this.onDrag} enableUserSelectHack={false}>
                <div className="QuaxObject" style={{ zIndex: "100" }}>
                    <div className="Inlets">
                        <IOLet connectionType={IOLetType.In} activePatchCableState={this.props.activePatchCableState} newPatchCableFn={this.props.newPatchCableFn} />
                        <IOLet connectionType={IOLetType.In} activePatchCableState={this.props.activePatchCableState} newPatchCableFn={this.props.newPatchCableFn} />
                        <IOLet connectionType={IOLetType.In} activePatchCableState={this.props.activePatchCableState} newPatchCableFn={this.props.newPatchCableFn} />
                        <IOLet connectionType={IOLetType.In} activePatchCableState={this.props.activePatchCableState} newPatchCableFn={this.props.newPatchCableFn} />
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <input type="text"></input>
                    </form>
                    <div className="Outlets">
                        <IOLet connectionType={IOLetType.Out} activePatchCableState={this.props.activePatchCableState} newPatchCableFn={this.props.newPatchCableFn} />
                        <IOLet connectionType={IOLetType.Out} activePatchCableState={this.props.activePatchCableState} newPatchCableFn={this.props.newPatchCableFn} />
                        <IOLet connectionType={IOLetType.Out} activePatchCableState={this.props.activePatchCableState} newPatchCableFn={this.props.newPatchCableFn} />
                        <IOLet connectionType={IOLetType.Out} activePatchCableState={this.props.activePatchCableState} newPatchCableFn={this.props.newPatchCableFn} />
                    </div>

                </div>
            </Draggable>
        );
    }

}

export default QuaxObject;
