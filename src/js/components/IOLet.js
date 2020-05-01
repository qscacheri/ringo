import React, { useState } from "react";
import { connect } from "react-redux";
import { addPatchCable, newConnection } from '../actions/actions.js'
import inletOff from '../../../assets/inlet_off.svg'; // with import
import outletOff from '../../../assets/outlet_off.svg'; // with import
import '../../css/IOLet.css';
import PatchCableManger from '../../js/utils/PatchCableManager'
function mapStateToProps(state) {
    return {
        activePatchCable: state.patchCableData.activePatchCable
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPatchCable: patchCable => dispatch(addPatchCable(patchCable)),
        newConnection: patchCable => dispatch(newConnection(patchCable))
    };
}

export const IOLetType =
{
    In: 'IN',
    Out: 'OUT'
}

function IOLet(props) {
    let myRef = React.createRef();

    function createPatchCable(e) {
        var boundingRect = myRef.current.getBoundingClientRect();
    }

    function handleClick(event) {
        var boundingRect = myRef.current.getBoundingClientRect();

        const ioletInfo = {
            objectId: parseInt(props.parentId),
            ioletIndex: props.ioletIndex,
            connectionType: props.connectionType,
            position: {
                x: boundingRect.x + (boundingRect.width / 2),
                y: boundingRect.y + (boundingRect.height / 2)
            }
        }

        PatchCableManger.handleClick(ioletInfo)

    }

    return (
        <svg className="IOLet" >
            <circle ref={myRef} onClick={handleClick} cx="50%" cy="50%" r="15%" stroke="aqua" />
        </svg>
        // <img ref={this.myRef} onClick={this.handleClick.bind(this)} src={sourceImage} style={{ width: "10%", margin: "0px" }}></img>
    );

}


export default IOLet;