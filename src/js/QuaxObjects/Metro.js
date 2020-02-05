
import './QuaxObjectBase';

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

        this.attributes[Metro.active] = false;
        this.attributes[Metro.rate] = 0;
    }

    sendData()
    {
        if (this.attributes[Metro.active] = true)
        {
            for (let i = 0; i < this.receivers.length(); i++)
            {
                setInterval(this.receivers[i].receiveData(1));
                console.log('sending data...');
                
            }
        }
    }

    receiveData(data)
    {
        // check which outlet the data is coming in on
        switch(data.outlet)
        {
            case 0: 
                this.attributes[Metro.rate] = data.value;
                break;
        }
    }

}