import React, { useState, useContext, useEffect } from 'react'
import '../../css/Toolbar.css'
import OBJECT_TYPES from '../constants/object-types'
import { Context } from './Processor'

function Toolbar({ createObject, takeFocus}) {
    const [localPatchName, setLocalPatchName] = useState("")
    let {patchName} = useContext(Context)
    useEffect(() => {
        setLocalPatchName(patchName)        
    }, [patchName])

    const handleChange = (e) => {
        setLocalPatchName(e.target.value)
        takeFocus()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
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
                    <input type="text" value={localPatchName} onChange={handleChange}></input>
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