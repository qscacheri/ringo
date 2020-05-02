import OBJECT_TYPES from '../constants/object-types'
import RandomObject from '../RingoObjects/RandomObject'
import PrintObject from '../RingoObjects/PrintObject';
import NewQuaxObject from '../RingoObjects/NewQuaxObject';
import OscillatorObject from '../RingoObjects/OscillatorObject'
import DacObject from '../RingoObjects/DacObject'
import MeterObject from '../RingoObjects/MeterObject';
import ButtonObject from '../RingoObjects/ButtonObject';
import NumberObject from '../RingoObjects/NumberObject';
import MetroObject from '../RingoObjects/MetroObject';

const createObject = (processorTree, type) => {
    console.log(type);

    switch (type) {
        case OBJECT_TYPES.RANDOM:
            return new RandomObject(processorTree)
        case OBJECT_TYPES.PRINT:
            return new PrintObject(processorTree)
        case OBJECT_TYPES.NUMBER:
            return new NumberObject(processorTree)
        case OBJECT_TYPES.BUTTON:
            return new ButtonObject(processorTree)
        case OBJECT_TYPES.SINE:
            return new OscillatorObject(processorTree)
        case OBJECT_TYPES.DAC:
            return new DacObject(processorTree)
        case OBJECT_TYPES.METER:
            return new MeterObject(processorTree)
        case OBJECT_TYPES.METRO:
            return new MetroObject(processorTree)
        default:
            return new NewQuaxObject(processorTree)
    }
}

export default createObject
