
import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import Draggable from 'react-draggable'; // The default
import './QuaxObject.css';
import PatchCable from './PatchCable.js'
import IOLet from './IOLet.jsx'

const IOLetType =
{
    In: 0,
    Out: 1
}

class QuaxObject extends Component {

    static ObjectTypes = 
    {
        Blank: -1
    };

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

    handleSubmit(e) {
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
                        <input type="text" onChange={this.handleChange.bind(this)}></input>
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
