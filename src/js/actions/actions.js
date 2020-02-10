import {
    ADD_OBJECT, 
    ADD_PATCH_CABLE, 
    SEND_OBJECT_DATA, 
    REMOVE_PATCH_CABLE, 
    OBJECT_TYPE_CHANGED, 
    NEW_CONNECTION, 
    OBJECT_DRAGGED, 
    EXPORT_STATE 
} from "../constants/action-types.js";

import Queue from '../utils/Queue'

import OBJECT_CALLBACKS from '../constants/object-callbacks'

export function addObject(payload) {
    return { type: ADD_OBJECT, payload }
};

export function addPatchCable(payload) {
    return { type: ADD_PATCH_CABLE, payload }
};

export function removePatchCable(payload) {
    return { type: REMOVE_PATCH_CABLE, payload }
};

export function objectTypeChanged(payload) {
    return { type: OBJECT_TYPE_CHANGED, payload }
};

export function newConnection(payload) {
    return { type: NEW_CONNECTION, payload }
};

export function objectDragged(payload) {
    return { type: OBJECT_DRAGGED, payload }
};

export function exportState(payload) {
    return { type: EXPORT_STATE, payload }
};

// export function sendObjectData(payload) {
//     return { type: SEND_OBJECT_DATA, payload }
// };

export function sendObjectData(payload) {
    return function(dispatch, getState)
    {
        // we've been notified an object has data to send
        // now we need to calculate that object's data based on the type of object, and it's attributes
        var objects = {...getState().objects }
        var current = objects[payload.objectId];
        // var dataToSend = OBJECT_CALLBACKS[object.type].GET_DATA_FOR_OUTLET(object.type, payload.outletIndex, object.attributes);
        var queue = new Queue();
        var visited = {};
        queue.enqueue(current);
        console.log(current);
        while (queue.isEmpty() == false)
        {
            current = queue.dequeue();
            var receivers = getState().objects[current.id].receivers;
            for (var i = 0; i < current.receivers.length; i++)
            {
                var hasVisited = receivers[i].objectId in visited;
                if (!hasVisited)
                {
                    visited[receivers[i].objectId] = true;
                    queue.enqueue(getState().objects[receivers[i].objectId]);
                }
            }
        }
        console.log(visited);
        
        return;
    }
};


export function testThunk()
{
    return function(dispatch, getState)
    {
        console.log("thunk thunked");
        console.log(getState());
        
    }
}
