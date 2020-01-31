import {OBJECT_TYPES} from './object-types.js'

var configs = {};

// EMTPY
configs[OBJECT_TYPES.EMPTY] = 
{
    type: OBJECT_TYPES.EMPTY,
    numInlets: 0,
    numOutlets: 0
};

// INVALID
configs[OBJECT_TYPES.INVALID] = 
{
    type: OBJECT_TYPES.INVALID,
    numInlets: 0,
    numOutlets: 0
};

// DAC
configs[OBJECT_TYPES.DAC] = 
{
    type: OBJECT_TYPES.DAC,
    numInlets: 2,
    numOutlets: 0
};

// SINE
configs[OBJECT_TYPES.SINE] = 
{
    type: OBJECT_TYPES.SINE,
    numInlets: 2,
    numOutlets: 1
};

export const OBJECT_CONFIGS = configs;