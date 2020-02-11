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

    }, 

    ASSIGN_ATTRIBUTES: function (object, newAttributes)
    {        
        return object;
    }

}

// PRINT
OBJECT_CALLBACKS[OBJECT_TYPES.PRINT] = {
    RECEIVE_DATA: function (inlet, data, objectState) {
        // completes necessary actions and returns a modified version of itself to update state,
        console.log(data);
        return objectState;
    },
   
    ASSIGN_ATTRIBUTES: function (object, newAttributes)
    {        
        return object;
    }
}

// NUMBER
OBJECT_CALLBACKS[OBJECT_TYPES.NUMBER] = {
    GET_DATA_FOR_OUTLET: function (outlet, attributes) {
        return attributes.storedData;
    },

    RECEIVE_DATA: function (inlet, data, objectState) {
        if (data === 'BANG!')  
        {
            // do nothing
        }      
        return objectState;
    },
    
    ASSIGN_ATTRIBUTES: function (object, newAttributes)
    {        
        object.attributes.storedData = newAttributes[0];
        return object;
    }
}

// RANDOM
OBJECT_CALLBACKS[OBJECT_TYPES.RANDOM] = {
    GET_DATA_FOR_OUTLET: function (outlet, attributes) 
    {
        return Math.random() * (attributes.max + attributes.min) + attributes.min;
    },

    RECEIVE_DATA: function (inlet, data, objectState) 
    {
        var newObject = { ...objectState };
        switch (inlet)
        {
            case 0: 
                // do nothing
                break;
            case 1:
                newObject.attributes.min = data;
                break;
            case 2: 
                newObject.attributes.max = data;
                break;
            default:
                break;
        }
        return newObject;
    }
}

export default OBJECT_CALLBACKS;       