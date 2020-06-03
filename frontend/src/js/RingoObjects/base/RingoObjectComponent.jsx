import React from 'react'
import OBJECT_TYPES from '../../constants/object-types'
import Receiver, {OutletInletPair} from '../../utils/Receiver'
import Draggable from 'react-draggable'; // The default
import '../../css/RingoObject.css';
import { IOLetType } from './IOLet'
import IOLetStrip from './IOLetStrip'
import {Context} from './Processor'

/* 
    Base ringo object class
*/

class RingoObjectComponent extends React.Component{
    static type = OBJECT_TYPES.EMPTY

    static numOutlets = 0
    static numInlets = 0

    static outletDescriptions = []
    static inletDescriptions = []

    constructor(props, processor, position, attributes) {
        super(props)
        this.processor = processor
        this.receivers = []
        this.attributes = {}
        this.position = { x: 0, y: 0 }
        this.isAudio = false
        this.state = {
            text: "",
            position
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    updateAttributes(attributeName, value) {
        // parses attribute array and sets
        // positional attributes accordingly
    }

    handleDrag(e, data) {
        setIsDrag(true);
        setPosition({ x:data.x, y: data.y })
    }

    setPosition(position) {
        this.setState({position})
    }

    getType() {
        return this.constructor.type
    }

    connect(outletIndex, inletIndex, inputID) {
        let newPair = new OutletInletPair(outletIndex, inletIndex)
        let alreadyPresent = false
        for (let i = 0; i < this.receivers.length; i++) {
            if (this.receivers[i].id === inputID) {
                this.receivers[i].outletInletPairs.push(newPair)
                alreadyPresent = true
            }
        }

        if (!alreadyPresent) this.receivers.push(new Receiver(inputID, newPair))
    }

    sendData(data) {
        for (let i = 0; i < this.receivers.length; i++) {
            let currentID = this.receivers[i].id
            if (!this.processor.state.objects[currentID]) {
                this.receivers.splice(i, 1)
                continue;
            }   
            
            // iterate through all outlet/inlet combinations
            for (let j = 0; j < this.receivers[i].outletInletPairs.length; j++) {
                let currentInlet = this.receivers[i].outletInletPairs[j].inlet
                this.processor.state.objects[currentID].receiveData(currentInlet, data)
            }

        }
    }

    receiveData(inlet, data) {

    }

    toJSON() {        
        const receivers = []
        this.receivers.map(receiver => {
            receivers.push(receiver.toJSON())
            return 0
        })

        return {
            type: this.constructor.type, 
            receivers,
            text: this.text,
            position: this.position,
            attributes: this.attributes
        }
    }

    isOutletConnectedTo(id) {
        for (let i = 0; i < this.receivers.length; i++) {            
            if (id === this.receivers[i].id) return true
        }
        return false
    }

    getIOLetDescription(type, index) {
        if (type === 'OUT')
            return this.constructor.outletDescriptions[index]
        else 
            return this.constructor.inletDescriptions[index]
    }

    render() {
        return(
            <Draggable bounds='parent' disabled={props.isLocked} onStop={handleStop} onDrag={handleDrag} enableUserSelectHack={false} defaultPosition={{ x: props.position.x, y: props.position.y }}>
            <div className="RingoObject" onClick={handleClick}>
                <IOLetStrip className='Inlets' offsets={props.offsets} updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numInlets} connectionType={IOLetType.In} dragging={position} />
                <form onSubmit={handleSubmit}>
                    <input ref={ref} autoComplete="off" onBlur={() => { setInputDisabled(true) }} disabled={inputDisabled} onKeyDown={e => e.stopPropagation()} name='type' value={textValue} type="text" onChange={handleChange}></input>
                </form>
                <IOLetStrip className='Outlets' offsets={props.offsets} updateShowInfo={props.updateShowInfo} id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} dragging={position}/>
            </div>
        </Draggable>
        )
    }
}