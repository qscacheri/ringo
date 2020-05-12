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
import ClusterObject from '../RingoObjects/core/ClusterObject'

import ThreeCanvasObject from '../RingoObjects/three/ThreeCanvasObject'
import ThreeShapeObject from '../RingoObjects/three/ThreeShapeObject'
const createObject = (processorTree, type) => {
    switch (type) {
        case OBJECT_TYPES.EMPTY:
            return new RingoObject(processorTree)
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
        case OBJECT_TYPES.GAIN:
            return new GainObject(processorTree)
        case OBJECT_TYPES.M2F:
            return new M2FObject(processorTree)
        case OBJECT_TYPES.ADD:
            return new AddObject(processorTree)
        case OBJECT_TYPES.CLUSTER:
            return new ClusterObject(processorTree)
        case OBJECT_TYPES.THREE_CANVAS:
            return new ThreeCanvasObject(processorTree)
        case OBJECT_TYPES.THREE_SHAPE:
            return new ThreeShapeObject(processorTree)
        default:
            return new RingoObject(processorTree)
    }
}

export default createObject
