import OBJECT_TYPES from '../constants/object-types'
import RandomObject from '../QuaxObjects/RandomObject'
import PrintObject from '../QuaxObjects/PrintObject';
import NewQuaxObject from '../QuaxObjects/NewQuaxObject';
import OscillatorObject from '../QuaxObjects/OscillatorObject'
import DacObject from '../QuaxObjects/DacObject'
import MeterObject from '../QuaxObjects/MeterObject';

const createObject = (processorTree, type) => {
    console.log(type);

    switch (type) {
        case OBJECT_TYPES.RANDOM:
            return new RandomObject(processorTree)
        case OBJECT_TYPES.PRINT:
            return new PrintObject(processorTree)
        case OBJECT_TYPES.SINE:
            return new OscillatorObject(processorTree)
        case OBJECT_TYPES.DAC:
            return new DacObject(processorTree)
        case OBJECT_TYPES.METER:
            return new MeterObject(processorTree)
        default:
            return new NewQuaxObject(processorTree)
    }
}

export default createObject
