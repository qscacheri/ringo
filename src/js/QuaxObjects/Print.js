
import './QuaxObjectBase';

class Print extends QuaxObjectBase {

    constructor() {
        super()
        this.type = OBJECT_TYPES.PRINT;
        this.numInlets = 1;
        this.numOutlets = 0;
        this.dsp = false;
    }

    sendData()
    {
        // DOES NOT SEND DATA
    }

    receiveData(data)
    {
        console.log(data.value);
    }

}
