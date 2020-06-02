import React, { useState, useContext, useEffect } from 'react'
import '../../css/Toolbar.css'
import OBJECT_TYPES from '../constants/object-types'
import { Context } from './Processor'

function Toolbar({ createObject, takeFocus}) {
    const ProcessorContext = useContext(Context)
    const [patchName, setPatchName] = useState('')
    
    useEffect(() => {
        setPatchName(ProcessorContext.patchName)
    }, [])

    const handleChange = (e) => {
        setPatchName(e.target.value)
        takeFocus()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        ProcessorContext.setPatchName(patchName)
    }

    const handleClick = (e) => {
        e.stopPropagation()    
        takeFocus()
    }

    return (
        <div className="Toolbar">
            <div className="patchNameContainer">
                <div className="patchNameLabel">Patch Name:</div>
                <form className="patchName" onSubmit={handleSubmit} onClick={handleClick}>
                    <input type="text" value={patchName} onChange={handleChange}></input>
                </form>
            </div>
            <div className="Controls">
                    <button className="ToolbarButton NewObject" onClick={() => { createObject(OBJECT_TYPES.EMPTY) }}>New Object</button>
                    <button className="ToolbarButton NewMessage" onClick={() => { createObject(OBJECT_TYPES.MESSAGE) }}>New Message</button>
                    <button className="ToolbarButton" onClick={() => console.log('lock')}>{true ? "Unlock" : "Lock"}</button>
            </div>
        </div>
    )
}

export default Toolbar