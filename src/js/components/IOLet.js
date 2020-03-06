import React, { useState } from "react";
import { connect } from "react-redux";
import { addPatchCable, newConnection } from '../actions/actions.js'
import inletOff from '../../../assets/inlet_off.svg'; // with import
import outletOff from '../../../assets/outlet_off.svg'; // with import
import '../../css/IOLet.css';

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
    In: 0,
    Out: 1
}

function ConnectedIOLet(props) {
    let myRef = React.createRef();

    function createPatchCable(e) {
        var boundingRect = myRef.current.getBoundingClientRect();
        return {
            id: new Date().getTime(),
            objectId: parseInt(props.parentId),
            ioletIndex: props.ioletIndex,
            neededConnectionType: !props.connectionType,
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

    function handleClick(event) {
        if (props.activePatchCable.id == -1)
            props.addPatchCable(createPatchCable(event));
        else if (props.activePatchCable.neededConnectionType == props.connectionType) {
            var inletId;
            var outletId;

            if (props.connectionType == IOLetType.In) {
                outletId = props.activePatchCable.objectId;
                inletId = parseInt(props.parentId);
            }

            else {
                inletId = props.activePatchCable.objectId;
                outletId = parseInt(props.parentId);
            }

            var boundingRect = myRef.current.getBoundingClientRect();
            props.newConnection({
                inObject:
                {
                    id: inletId,
                    ioletIndex: 0
                },

                outObject:
                {
                    id: outletId,
                    ioletIndex: props.ioletIndex
                },

                position: {
                    x: boundingRect.x + (boundingRect.width / 2),
                    y: boundingRect.y + (boundingRect.height / 2),
                }
            })
        }
    }

    return (
        <svg className="IOLet" >
            <circle ref={this.myRef} onClick={this.handleClick.bind(this)} cx="50%" cy="50%" r="15%" stroke="aqua" />
        </svg>
        // <img ref={this.myRef} onClick={this.handleClick.bind(this)} src={sourceImage} style={{ width: "10%", margin: "0px" }}></img>
    );

}

const IOLet = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedIOLet);
export default IOLet;