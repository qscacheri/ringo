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

const RingoObjects = {}

RingoObjects[RingoObject.type] =      RingoObject
RingoObjects[RandomObject.type] =      RandomObject
RingoObjects[PrintObject.type]  =      PrintObject
RingoObjects[GainObject.type]   =      GainObject
RingoObjects[OscillatorObject.type] =  OscillatorObject
RingoObjects[DacObject.type] =         DacObject
RingoObjects[MeterObject.type] =       MeterObject
RingoObjects[ButtonObject.type] =      ButtonObject
RingoObjects[NumberObject.type] =      NumberObject
RingoObjects[NumberObject.type] =      NumberObject
RingoObjects[MetroObject.type] =       MetroObject
RingoObjects[MessageObject.type] =     MessageObject
RingoObjects[M2FObject.type] =         M2FObject
RingoObjects[InputObject.type] =       InputObject
RingoObjects[ScaleObject.type] =       ScaleObject
RingoObjects[AddObject.type] =         AddObject
RingoObjects[SliderObject.type] =      SliderObject
RingoObjects[ThreeCanvasObject.type] = ThreeCanvasObject
RingoObjects[ThreeShapeObject.type] =  ThreeShapeObject

const createRingoObject = (id, type, processor, position, attributes) => {
    if (!RingoObjects[type]) throw(new Error('The type supplied is not a valid object type'))
    
    else return new RingoObjects[type](id, processor, position, attributes)
}
export default createRingoObject