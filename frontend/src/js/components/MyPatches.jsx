import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import '../../css/MyPatches.css'
import Patch from './Patch'

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS
const MyPatches = () => {
    const [Patches, setPatches] = useState([])
    useEffect(() => {
        const config = {headers: { Authorization: `Bearer ${token}` }}
        Axios.get(`${serverAddress}/my-Patches`, config).then((res) => {

        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const handleSelection = () => {

    }

    const renderPatches = () => {
        const renderPatches = []
        Patches.map((Patch) => {
            renderPatches.push(<Patch patchName={"alsdkjflaskdj"} handleSelection={handleSelection} />)
        })
        return renderPatches
    }

    return (<div className="MyPatches">
        <div className="newPatchButton">+</div>
        { renderPatches }
    </div>)
}

export default MyPatches
