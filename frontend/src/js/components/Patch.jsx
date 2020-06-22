import React, { useEffect, useState } from 'react'
import '../../css/Patch.css'
import dots from '../../../assets/dots.svg'
import PopupMenu from './PopupMenu'

const axios = require('axios')
const Patch = ({patchName, patchID, handleSelection, handleMenuItem}) => {
    const [textValue, setTextValue] = useState("")
    const [inputRef,setInputRef] = useState(null)
    useEffect(() => {
        setTextValue(patchName)
    }, [patchName])

    const handleSubmit = async (e) => {
        e.preventDefault()
        inputRef.blur()
        await axios.post('/update-patch-name', {patchID, newPatchName: textValue})
    }

    return (<div className="Patch" onClick={() => handleSelection(patchID)}>
        <div className="patchHeader">
            <form onSubmit={handleSubmit}>
                <input ref={setInputRef} type="text" className='patchName' value={textValue} onChange={(e) => setTextValue(e.target.value)} onClick={(e) => e.stopPropagation()}></input>
            </form>
            <PopupMenu buttonStyleName="popupButton">
                <li onClick={(e)=>handleMenuItem(patchID, "delete", e)}>Delete</li>
                <li onClick={()=>handleMenuItem("share")}>Share</li>
                <form className="visibilityForm">
                    <label>Public</label>
                    <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
                </form>
                <li onClick={()=>handleMenuItem("duplicate")}>Duplicate</li>
                <li onClick={()=>handleMenuItem("download")}>Download</li>
            </PopupMenu>
        </div>
    </div>)
}

export default Patch
