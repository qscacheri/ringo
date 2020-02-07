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

export function sendObjectData(payload) {
    return { type: SEND_OBJECT_DATA, payload }
};

