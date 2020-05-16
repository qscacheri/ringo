import OBJECT_TYPES from '../constants/object-types'
import RingoObject from '../RingoObjects/base/RingoObject';
import RandomObject from '../RingoObjects/core/RandomObject'
import PrintObject from '../RingoObjects/core/PrintObject';
import GainObject from '../RingoObjects/audio/GainObject'
import OscillatorObject from '../RingoObjects/audio/OscillatorObject'
import DacObject from '../RingoObjects/audio/DacObject'
import MeterObject from '../RingoObjects/audio/MeterObject';
import ButtonObject from '../RingoObjects/core/ButtonObject';
import NumberObject from '../RingoObjects/core/NumberObject';
import MetroObject from '../RingoObjects/core/MetroObject';
import MessageObject from '../RingoObjects/core/MessageObject'
import M2FObject from '../RingoObjects/core/M2FObject'
import InputObject from '../RingoObjects/audio/InputObject'
import ScaleObject from '../RingoObjects/core/ScaleObject'
import AddObject from '../RingoObjects/core/AddObject'
import SliderObject from '../RingoObjects/core/SliderObject'
import ThreeCanvasObject from '../RingoObjects/three/ThreeCanvasObject'
import ThreeShapeObject from '../RingoObjects/three/ThreeShapeObject'

const createObject = (processorTree, type, position) => {
    console.log('creator: ', position);
    
    switch (type) {
        case OBJECT_TYPES.EMPTY:
            return new RingoObject(processorTree, position)
        case OBJECT_TYPES.MESSAGE:
            return new MessageObject(processorTree, position)
        case OBJECT_TYPES.RANDOM:
            return new RandomObject(processorTree, position)
        case OBJECT_TYPES.PRINT:
            return new PrintObject(processorTree, position)
        case OBJECT_TYPES.SCALE:
            return new ScaleObject(processorTree, position)
        case OBJECT_TYPES.NUMBER:
            return new NumberObject(processorTree, position)
        case OBJECT_TYPES.BUTTON:
            return new ButtonObject(processorTree, position)
        case OBJECT_TYPES.OSC:
            return new OscillatorObject(processorTree, position)
        case OBJECT_TYPES.INPUT:
            return new InputObject(processorTree, position)
        case OBJECT_TYPES.DAC:
            return new DacObject(processorTree, position)
        case OBJECT_TYPES.METER:
            return new MeterObject(processorTree, position)
        case OBJECT_TYPES.METRO:
            return new MetroObject(processorTree, position)
        case OBJECT_TYPES.GAIN:
            return new GainObject(processorTree, position)
        case OBJECT_TYPES.M2F:
            return new M2FObject(processorTree, position)
        case OBJECT_TYPES.ADD:
            return new AddObject(processorTree, position)
        case OBJECT_TYPES.THREE_CANVAS:
            return new ThreeCanvasObject(processorTree, position)
        case OBJECT_TYPES.SLIDER:
            return new SliderObject(processorTree, position)

        case OBJECT_TYPES.THREE_SHAPE:
            return new ThreeShapeObject(processorTree, position)
        default:
            return new RingoObject(processorTree, position)
    }
}

export default createObject
