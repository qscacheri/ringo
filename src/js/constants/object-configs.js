import { OBJECT_TYPES } from './object-types.js'

var configs = {};

// EMTPY
configs[OBJECT_TYPES.EMPTY] =
{
    type: OBJECT_TYPES.EMPTY,
    numInlets: 0,
    numOutlets: 0,
    dsp: false
};

// INVALID
configs[OBJECT_TYPES.INVALID] =
{
    type: OBJECT_TYPES.INVALID,
    numInlets: 0,
    numOutlets: 0,
    dsp: false
};

// BUTTON
configs[OBJECT_TYPES.BUTTON] =
{
    type: OBJECT_TYPES.BUTTON,
    numInlets: 1,
    numOutlets: 1,
    receivers: [],
    attributes: {},
    dsp: false
};

// NUMBER
configs[OBJECT_TYPES.NUMBER] =
{
    type: OBJECT_TYPES.NUMBER,
    numInlets: 1,
    numOutlets: 1,
    receivers: [],
    attributes: {storedData: 25},
    dsp: false
};


// METRO
configs[OBJECT_TYPES.METRO] =
{
    type: OBJECT_TYPES.METRO,
    numInlets: 1,
    numOutlets: 1,
    receivers: [],
    attributes: {
        active: 1,
        rate: 1000
    },
    dsp: false
};

// SINE
configs[OBJECT_TYPES.PRINT] =
{
    type: OBJECT_TYPES.PRINT,
    numInlets: 1,
    numOutlets: 0,
    receivers: [],
    dsp: false
};

// DAC
configs[OBJECT_TYPES.DAC] =
{
    type: OBJECT_TYPES.DAC,
    numInlets: 2,
    numOutlets: 0,
    dsp: true
};

// SINE
configs[OBJECT_TYPES.SINE] =
{
    type: OBJECT_TYPES.SINE,
    numInlets: 2,
    numOutlets: 1,
    dsp: true
};


export const OBJECT_CONFIGS = configs;