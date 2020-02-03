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

// METRO
configs[OBJECT_TYPES.METRO] =
{
    type: OBJECT_TYPES.METRO,
    numInlets: 0,
    numOutlets: 0,
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


class QuaxObjectBase {
    constructor() {
        this.type = -1;
        this.receivers = [];
        this.numInlets = -1;
        this.numOutlets = -1;
        this.dsp = -1
        this.attributes = {};
    }

    sendData()
    {

    }

    receiveData(data)
    {

    }

    toProps() {
        return {
            type: this.type,
            numInlets: this.numInlets,
            numOutlets: this.numOutlets,
            dsp: this.dsp
        }
    }
}

class Metro extends QuaxObjectBase {
    static attributeNames = {
        active: 'active',
        rate: 'rate'
    }

    constructor() {
        super()
        this.type = OBJECT_TYPES.METRO;
        this.numInlets = 1;
        this.numOutlets = 1;
        this.dsp = false;

        this.attributes[active] = false;
        this.attributes[rate] = 0;
    }

    sendData()
    {
        if (this.attributes[active] = true)
        {
            for (let i = 0; i < listeners.length(); i++)
            {
                setInterval(listeners[i].receiveData(1));
                console.log('sending data...');
                
            }
        }
    }

    receiveData(data)
    {

    }

}


export const OBJECT_CONFIGS = configs;