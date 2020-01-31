import React, { Component } from "react";
import { connect } from "react-redux";
import {addPatchCable} from '../actions/index.js'

import inletOff from '../../../assets/inlet_off.svg'; // with import
import outletOff from '../../../assets/outlet_off.svg'; // with import

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
    }

    handleClick(event)
    {
        this.props.addPatchCable({test: "testing"});
    }

    render()
    {
        const sourceImage = this.props.connectionType == IOLetType.In ? inletOff : outletOff
        return (
            <img ref={this.getPosition} onClick={this.handleClick.bind(this)} src={sourceImage} style={{ width: "10%", margin: "0px" }}></img>
        );
 
    }
}

const IOLet = connect(
    null,
    mapDispatchToProps
)(ConnectedIOLet);
export default IOLet;
