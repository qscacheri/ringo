import React, { useEffect, useState } from 'react'
import '../../css/Patch.css'
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

    return (<div className="Patch" onClick={handleSelection}>
        <form onSubmit={handleSubmit}>
            <input type="text" className='patchName' value={textValue} onChange={(e) => setTextValue(e.target.value)}></input>
        </form>
    </div>)
}

export default Patch
