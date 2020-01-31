import { ADD_OBJECT, ADD_PATCH_CABLE, OBJECT_TYPE_CHANGED } from "../constants/action-types.js";
import { OBJECT_TYPES } from "../constants/object-types.js";

export function addObject(payload) {
    return { type: ADD_OBJECT, payload }
};

export function addPatchCable(payload) {
    return { type: ADD_PATCH_CABLE, payload }
};

export function objectTypeChanged(payload) {
    return { type: OBJECT_TYPE_CHANGED, payload }
};

