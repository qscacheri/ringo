import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import OBJECT_CALLBACKS from "../constants/object-callbacks.js";
import store from '../store/index'
import { dspCreateSuccess } from '../actions/actions'
import { OBJECT_TYPES } from '../constants/object-types'
import Queue from '../utils/Queue'
function mapStateToProps(state) {
    return {
        objects: state.objects,
        patchCableData: state.patchCableData,
        newDSPObject: state.newDSPObject,
        newToneConnection: state.newToneConnection,
        dataFlow: state.dataFlow
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dspCreateSuccess: status => dispatch(dspCreateSuccess(status))
    }
};

function ConnectedDataManager(props) {
    const [nodes, setNodes] = useState({});

    // useState(setInterval(()=>console.log("hello"), 1));

    useEffect(() => {
        if (props.newDSPObject.id != -1) {
            addNode(props.newDSPObject.id, props.newDSPObject.type);
            props.dspCreateSuccess({ status: 'success' });
        }

        if (props.newToneConnection.out.id != -1) {
            addConnection(props.newToneConnection.in, props.newToneConnection.out);
        }

        if (props.dataFlow.status == 'DATA_SENT')
        {
            
        }


    })

    let addNode = (id, type, attributes) => {
        console.log(props.newDSPObject.attributes);

        setNodes({ ...nodes, [id]: OBJECT_CALLBACKS[type].CREATE(props.newDSPObject.attributes) });
    }

    let addConnection = (input, output) => {
        if (input.type == OBJECT_TYPES.DAC) {
            nodes[output.id].toMaster();
        }
        else {
            nodes[output.id].connect(nodes[input.id]);
        }
    }

    let routeData = (rootId, ) => {
        // we've been notified an object has data to send
        // now we need to calculate that object's data based on the type of object, and it's attributes
        var objects = { ...props.objects }
        var current = objects[rootId];
        var queue = new Queue();
        var visited = {};
        queue.enqueue(current);
        while (queue.isEmpty() == false) {
            current = queue.dequeue();

            var children = objects[current.id].children;
            var parents = objects[current.id].parents;
            if (parents.length > 0) {
                for (let i = 0; i < parents.length; i++) {
                    let parent = objects[parents[i].objectId];
                    var dataToSend = OBJECT_CALLBACKS[parent.type].GET_DATA_FOR_OUTLET(parents[i].outletIndex, parent.attributes);
                    objects[current.id] = OBJECT_CALLBACKS[current.type].RECEIVE_DATA(0, dataToSend, current);
                }
            }

            for (var i = 0; i < current.children.length; i++) {
                var hasVisited = children[i].objectId in visited;
                if (!hasVisited) {
                    visited[children[i].objectId] = true;
                    queue.enqueue(objects[children[i].objectId]);
                }
            }

        }
        return;
    }

    return null;
}

const DataManager = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedDataManager);
export default DataManager;
