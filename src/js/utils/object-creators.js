import OBJECT_TYPES from '../constants/object-types'
import NewRingoObject from '../RingoObjects/NewQuaxObject'
import RandomObject from '../RingoObjects/RandomObject'
import PrintObject from '../RingoObjects/PrintObject';
import NewQuaxObject from '../RingoObjects/NewQuaxObject';
import OscillatorObject from '../RingoObjects/OscillatorObject'
import DacObject from '../RingoObjects/DacObject'
import MeterObject from '../RingoObjects/MeterObject';
import ButtonObject from '../RingoObjects/ButtonObject';
import NumberObject from '../RingoObjects/NumberObject';
import MetroObject from '../RingoObjects/MetroObject';
import MessageObject from '../RingoObjects/MessageObject'
import M2FObject from '../RingoObjects/M2FObject'
import InputObject from '../RingoObjects/InputObject'
import ScaleObject from '../RingoObjects/ScaleObject'

const createObject = (processorTree, type) => {
    switch (type) {
        case OBJECT_TYPES.EMPTY:
            return new NewRingoObject(processorTree)
        case OBJECT_TYPES.MESSAGE:
            return new MessageObject(processorTree)
        case OBJECT_TYPES.RANDOM:
            return new RandomObject(processorTree)
        case OBJECT_TYPES.PRINT:
            return new PrintObject(processorTree)
        case OBJECT_TYPES.SCALE:
            return new ScaleObject(processorTree)
        case OBJECT_TYPES.NUMBER:
            return new NumberObject(processorTree)
        case OBJECT_TYPES.BUTTON:
            return new ButtonObject(processorTree)
        case OBJECT_TYPES.OSC:
            return new OscillatorObject(processorTree)
        case OBJECT_TYPES.INPUT:
            return new InputObject(processorTree)
        case OBJECT_TYPES.DAC:
            return new DacObject(processorTree)
        case OBJECT_TYPES.METER:
            return new MeterObject(processorTree)
        case OBJECT_TYPES.METRO:
            return new MetroObject(processorTree)
        case OBJECT_TYPES.M2F:
            return new M2FObject(processorTree)
        default:
            return new NewQuaxObject(processorTree)
    }
}

export default createObject
