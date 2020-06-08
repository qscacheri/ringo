import React, { useEffect, useState, useContext } from 'react'
import '../../css/MyPatches.css'
import Patch from './Patch'
import {AppContext} from './App'
import plus from '../../../assets/plus.svg'
const axios = require('axios')
const MyPatches = () => {
    const [patches, setPatches] = useState([])
    const AppCtx = useContext(AppContext)
    useEffect(() => {        
        if (!AppCtx.loggedIn) return
        
        axios.get('/my-patches').then((res) => {
            setPatches(res.data)
            
        }).catch((err) => {
            console.log(err)
        })
    }, [AppCtx.loggedIn])

    const handleSelection = () => {

    }

    const getPatches = async () => {
        axios.get('/my-patches').then((res) => {
            console.log(res);
            
            setPatches(res.data)
        }).catch((err) => console.log(err))
    }

    const handleNewPatch = () => {
        axios.post('/new-patch').then((res) => {
            getPatches()
        }).catch((err) => console.log(err))
    }

    const renderPatches = () => {
        const renderPatches = []
        patches.map((patch) => {
            renderPatches.push(<Patch key={patch._id} patchID = {patch._id} patchName={patch.patchName} handleSelection={handleSelection} />)
        })
        return renderPatches
    }

    return (<div className="MyPatches">
        <h1>My Patches</h1>
        <div className="patches">
            <div className="newPatchButton" onClick={handleNewPatch}><img src={plus}></img></div>
            { renderPatches() }
        </div>
    </div>)
}

export default MyPatches
