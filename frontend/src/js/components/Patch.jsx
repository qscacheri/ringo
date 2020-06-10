import React, { useEffect, useState } from 'react'
import '../../css/Patch.css'
import dots from '../../../assets/dots.svg'

const axios = require('axios')
const Patch = ({patchName, patchID, handleSelection}) => {
    const [textValue, setTextValue] = useState("")
    useEffect(() => {
        setTextValue(patchName)
    }, [patchName])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('/update-patch-name', {patchID, newPatchName: textValue})
    }

    return (<div className="Patch" onClick={() => handleSelection(patchID)}>
        <img className="dots" src={dots}></img>
        <form onSubmit={handleSubmit}>
            <input type="text" className='patchName' value={textValue} onChange={(e) => setTextValue(e.target.value)}></input>
        </form>
    </div>)
}

export default Patch
