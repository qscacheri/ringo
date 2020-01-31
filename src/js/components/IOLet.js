import React, { Component } from "react";
import { connect } from "react-redux";
import {addPatchCable} from '../actions/index.js'

import inletOff from '../../../assets/inlet_off.svg'; // with import
import outletOff from '../../../assets/outlet_off.svg'; // with import

import { LocationProvider, Match, MatchFirst, Link } from 'react-location'
 
function mapDispatchToProps(dispatch) {
    return {
        addPatchCable: patchCable => dispatch(addPatchCable(patchCable))
    };
}

export const IOLetType =
{
    In: 0,
    Out: 1
}

class ConnectedIOLet extends Component
{
    constructor(props)
    {
        super(props);
        this.createPatchCable = this.createPatchCable.bind(this);

        this.myRef = React.createRef();
    }

    createPatchCable(e)
    {
        var boundingRect = this.myRef.current.getBoundingClientRect();
        return {
            id: new Date().getTime(),
            pos1: {
                x: boundingRect.x + (boundingRect.width / 2),
                y: boundingRect.y + (boundingRect.height / 2)
            },
            pos2: {
                x: 0,
                y: 0
            }
        }
    }

    handleClick(event)
    {
        var newPatchCable = this.createPatchCable(event);
        this.props.addPatchCable(newPatchCable);
    }
    
    render()
    {
        const sourceImage = this.props.connectionType == IOLetType.In ? inletOff : outletOff
        return (
                <img ref={this.myRef} onClick={this.handleClick.bind(this)} src={sourceImage} style={{ width: "10%", margin: "0px" }}></img>
        );
 
    }
}

const IOLet = connect(
    null,
    mapDispatchToProps
)(ConnectedIOLet);
export default IOLet;
