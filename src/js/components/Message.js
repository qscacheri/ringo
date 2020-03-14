import React, { useState } from "react";
import { connect } from "react-redux";
import Draggable from 'react-draggable'; // The default
import '../../css/Message.css';
import { IOLetType } from './IOLet.js'
import { updateObject, sendObjectData, selectNewObject } from '../actions/actions'
import IOLetStrip from './IOLetStrip.js'

function mapDispatchToProps(dispatch) {
    return {
        updateObject: newType => dispatch(updateObject(newType)),
        sendObjectData: data => dispatch(sendObjectData(data)),
        selectNewObject: newObject => dispatch(selectNewObject(newObject))
    };
}

function ConnectedMessage(props) {
    let ref = React.createRef();
    let dspObject; 

    const [isDrag, setIsDrag] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [inputDisabled, setInputDisabled] = useState(true);

    function handleChange(e) {
        setTextValue(event.target.value);
    }


    function handleDrag(e, data) {
        setIsDrag(true);
    }


    function handleClick(e) {
        if (isDrag == false) {
            console.log("Clicked on object with id:", props.id);
            // this.setState({ inputDisabled: false });
            setInputDisabled(false);
            // this.ref.current.focus();
            ref.current.focus();
        }

        props.selectNewObject({ id: props.id });
        e.stopPropagation();
        setIsDrag(false);
    }
    
    function handleSubmit(e)
    {
        e.preventDefault();
        // if (textValue.toUpperCase() == OBJECT_TYPES.SINE)
        //     dspObject = new Oscillator(100, 'square').start().toMaster();
        // console.log(dspObject);
        props.updateObject({ id: parseInt(props.id), objectText: textValue });

        return;
    }

    return (
        <Draggable bounds={{ top: 30 }} onDrag={handleDrag} enableUserSelectHack={false} defaultPosition={{ x: props.position.x, y: props.position.y }}>
            <div className="Message" onClick={handleClick}>
                <IOLetStrip className='Inlets' id={props.id} numIOLets={props.numInlets} connectionType={IOLetType.In} />
                <form onSubmit={handleSubmit}>
                    <input ref={ref} autoComplete="off" onBlur={disableInput => { setInputDisabled(true) }} disabled={inputDisabled} onKeyDown={e => e.stopPropagation()} name='type' value={textValue} type="text" onChange={handleChange}></input>
                </form>
                <IOLetStrip className='Outlets' id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} />
            </div>
        </Draggable>
    )


}

const Message = connect(
    null,
    mapDispatchToProps)(ConnectedMessage);
export default Message;
