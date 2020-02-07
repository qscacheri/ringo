import { OBJECT_TYPES } from './object-types'
OBJECT_CALLBACKS = {};

OBJECT_CALLBACKS[OBJECT_TYPES.METRO].SEND = function(data)
{
    
}

OBJECT_CALLBACKS[OBJECT_TYPES.PRINT].RECIEVE = function(inlet, data)
{
    console.log(data);
}

export const OBJECT_CALLBACKS;                         