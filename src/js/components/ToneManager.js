import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import OBJECT_CALLBACKS from "../constants/object-callbacks.js";
import store from '../store/index'
import { dspCreateSuccess } from '../actions/actions'
import { OBJECT_TYPES } from '../constants/object-types'

function mapStateToProps(state) {
    return {
        objects: state.objects,
        patchCableData: state.patchCableData,
        newDSPObject: state.newDSPObject,
        newToneConnection: state.newToneConnection
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dspCreateSuccess: status => dispatch(dspCreateSuccess(status))
    }
};

function ConnectedToneManager(props) {
    const [nodes, setNodes] = useState({});

    useEffect(() => {
        if (props.newDSPObject.id != -1) {
            addNode(props.newDSPObject.id, props.newDSPObject.type);
            props.dspCreateSuccess({ status: 'success' });
        }

        if (props.newToneConnection.out.id != -1)
        {
            addConnection(props.newToneConnection.in, props.newToneConnection.out);
        }
    })
    
    let addNode = (id, type, attributes) => {
        console.log(props.newDSPObject.attributes);
        
        setNodes({ ...nodes, [id]: OBJECT_CALLBACKS[type].CREATE(props.newDSPObject.attributes) });
    }

    let addConnection = (input, output) => {
        if (input.type == OBJECT_TYPES.DAC){
            nodes[output.id].toMaster();
        }
        else
        {
            nodes[output.id].connect(nodes[input.id]);
        }
    }

    return null;
}

const ToneManager = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedToneManager);
export default ToneManager;
