import { OBJECT_TYPES } from "../constants/object-types";

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
        throw 'objects need to override sendData'
    }

    receiveData(data)
    {
        throw 'objects need to override receieveData'
    }

    static getConfig() {
        return {
            type: this.type,
            numInlets: this.numInlets,
            numOutlets: this.numOutlets,
            dsp: this.dsp
        }
    }
}

export { QuaxObjectBase }