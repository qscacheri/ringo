import OBJECT_TYPES from './object-types'
import { 
    Oscillator,
 } from "tone";

let DSP_CREATORS = {};

DSP_CREATORS[OBJECT_TYPES.SINE] = () => {return new Tone.Oscillator(440, 'sine').start().toMaster()}

export default DSP_CREATORS; 