/* eslint-disable */

import React, { Component, useState} from "react";
import { connect } from "react-redux";
import Draggable from 'react-draggable'; // The default
import '../../css/QuaxButton.css';
import '../../css/QuaxObject.css';

import { IOLetType } from './IOLet'
import { updateObject, sendObjectData, selectNewObject } from '../actions/actions'
import IOLetStrip from './IOLetStrip'

function mapStateToProps(state) {
    return {
        test: "test"
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateObject: newType => dispatch(updateObject(newType)),
        sendObjectData: data => dispatch(sendObjectData(data)),
        selectNewObject: newObject => dispatch(selectNewObject(newObject))
    };
}

function ConnectedQuaxButton(props) {
    
    const [isDrag, setIsDrag] = useState(0);
    function handleClick(e) {

        props.selectNewObject({ id: props.id });
        props.sendObjectData({ value: 'BANG', outletIndex: 0, objectId: props.id })
        e.stopPropagation();
        setIsDrag(false);

    }

    return (<Draggable>
        <div className="QuaxButton">
            <IOLetStrip id={props.id}
                numIOLets={props.numInlets}
                connectionType={IOLetType.In} />
            <svg>
                <circle className="QuaxButtonCircle" cx="50%" cy="50%" r="20%" onClick={handleClick} stroke="aqua"> </circle>
            </svg>
            <IOLetStrip id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} />
        </div>
    </Draggable>
    )
}



const QuaxButton = connect(
    null,
    mapDispatchToProps)(ConnectedQuaxButton);
export default QuaxButton;