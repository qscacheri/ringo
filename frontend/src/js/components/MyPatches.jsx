import React, { useEffect, useState } from 'react'
import '../../css/MyPatches.css'
import Patch from './Patch'
const Axios = require('axios')
const serverAddress = process.env.REACT_APP_SERVER_ADDRESS
const MyPatches = ({token}) => {
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
        <h1>My Patches</h1>
        <div className="patches">
            <div className="newPatchButton"><div>+</div></div>
            { renderPatches }
        </div>
    </div>)
}

export default MyPatches
