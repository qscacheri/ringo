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

function Factory() {
    const create = (type, processorTree) => {
        return  0
    }
}

export default new Factory()
