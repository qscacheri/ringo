import { OBJECT_TYPES } from './object-types'
OBJECT_CALLBACKS = {};
/* 
each outlet send function takes 3 parameters:
    -which outlet to send data out of,
    -what data to send
    -who needs to receive the data

when a receiver gets it's data, it decides what to do with
that data based on which inlet it was received on, and possibly 
what type of data it received
*/
var OBJECT_CALLBACKS = {};

// BUTTON
OBJECT_CALLBACKS[OBJECT_TYPES.BUTTON] = {
    GET_DATA_FOR_OUTLET: function (outlet, attributes) {
        return 'BANG'
    }
}

// PRINT
OBJECT_CALLBACKS[OBJECT_TYPES.PRINT] = {
    RECEIVE_DATA: function (inlet, data, objectState) {
        // completes necessary actions and returns a modified version of itself to update state,
        console.log(data); 
        return objectState;
    }
}

OBJECT_CALLBACKS[OBJECT_TYPES.NUMBER] = {
    GET_DATA_FOR_OUTLET: function (outlet, attributes) {
        return attributes.storedData;
    },

    RECEIVE_DATA: function (inlet, data, objectState) {
        return objectState;
    }
}



export default OBJECT_CALLBACKS;                         