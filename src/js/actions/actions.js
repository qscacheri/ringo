var fileDownload = require('js-file-download');
console.log(fileDownload);


import {
    ADD_OBJECT, 
    ADD_PATCH_CABLE, 
    REMOVE_PATCH_CABLE, 
    UPDATE_OBJECT, 
    NEW_CONNECTION, 
    OBJECT_DRAGGED, 
    SELECT_NEW_OBJECT,
    DELETE_OBJECT
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

export function updateObject(payload) {
    return { type: UPDATE_OBJECT, payload }
};

export function newConnection(payload) {
    return { type: NEW_CONNECTION, payload }
};

export function objectDragged(payload) {
    return { type: OBJECT_DRAGGED, payload }
};

export function exportState(payload) {
    return function(dispatch, getState)
    {
        fileDownload(JSON.stringify(getState()), 'filename.quax');
        
    }
};

export function sendObjectData(payload) {
    return function(dispatch, getState)
    {
        // we've been notified an object has data to send
        // now we need to calculate that object's data based on the type of object, and it's attributes
        var state = getState();
        var objects = {...getState().objects }
        var current = objects[payload.objectId];
        var queue = new Queue();
        var visited = {};
        queue.enqueue(current);
        while (queue.isEmpty() == false)
        {

            current = queue.dequeue();
            var children = state.objects[current.id].children;
            // RIGHT NOW HANDLE ONE PARENT 
            // TODO - HANDLE MULTIPLE PARENTS

            var parents = state.objects[current.id].parents;            
            var parent;
            if (parents.length > 0)
            {
                for (let i = 0; i < parents.length; i++)
                {
                    console.log(i);
                    
                    parent = state.objects[parents[i].objectId];
                    var dataToSend = OBJECT_CALLBACKS[parent.type].GET_DATA_FOR_OUTLET(payload.outletIndex, parent.attributes);
                    OBJECT_CALLBACKS[current.type].RECEIVE_DATA(0, dataToSend, current);                    
                }
            }
            
            for (var i = 0; i < current.children.length; i++)
            {
                var hasVisited = children[i].objectId in visited;
                if (!hasVisited)
                {
                    visited[children[i].objectId] = true;
                    queue.enqueue(getState().objects[children[i].objectId]);
                }
            }

        }        
        return;
    }
};

export function selectNewObject(payload)
{
    return {type: SELECT_NEW_OBJECT, payload}
}

export function deleteObject(payload)
{
    return {type: DELETE_OBJECT, payload}
}

export function testThunk()
{
    return function(dispatch, getState)
    {
        console.log("thunk thunked");
        console.log(getState());
        
    }
}
