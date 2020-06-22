import React, { useEffect, useState, useContext } from 'react'
import '../../css/MyPatches.css'
import Patch from './Patch'
import {AppContext} from './App'
import plus from '../../../assets/plus.svg'
import { Redirect } from 'react-router-dom'
const axios = require('axios')
const MyPatches = () => {
    const [patches, setPatches] = useState({})
    const {token, loggedIn, username} = useContext(AppContext)
    const [redirectTo, setRedirectTo] = useState()
    const [loading, setLoading] = useState(true)
    const [shouldRerender, setShouldRerender] = useState(false)
    const getPatches = async () => {
        axios.get('/my-patches').then((res) => {
            const newPatches = {}
            res.data.map((patch) => {
                newPatches[patch._id] = patch
            })
            setPatches(newPatches)

        }).catch((err) => {
            if (err.response.status === 403) {
                setRedirectTo('login-signup')
            }
        })   
     }

    useEffect(() => {                
        if (!loggedIn) setRedirectTo('login-signup')
        
        getPatches()

    }, [loggedIn, token])

    const handleSelection = (id) => {
        setRedirectTo(`patch?id=${id}`)
    }


    const handleNewPatch = () => {
        axios.post('/new-patch').then((res) => {
            getPatches()
        }).catch((err) => console.log(err))
    }

    const handleMenuItem = (patchID, item, e) => {
        e.stopPropagation();
        switch(item) {
            case "delete": 
                axios.post('/delete-patch', { patchID }).then((res) => {
                    getPatches()
                }).catch((err) => {

                })
                break;
            default:
                break;
        }
    }

    const renderPatches = () => {
        const renderPatches = []
        for (let i in patches) {
            let patch = patches[i]
            renderPatches.push(<Patch 
                key={patch._id} 
                patchID = {patch._id} 
                patchName={patch.patchName} 
                handleSelection={handleSelection} 
                handleMenuItem={handleMenuItem} 
                previewImage={`${process.env.REACT_APP_SERVER_ADDRESS}/${patch._id}.jpeg`}
            />)
        }
        return renderPatches
    }

    if (redirectTo) return <Redirect to={redirectTo} />

    return (<div className="MyPatches">
        <h1>My Patches</h1>
        <div className="patches">
            <div className="newPatchButton" onClick={handleNewPatch}><img src={plus}></img></div>
            { renderPatches() }
        </div>
    </div>)
}

export default MyPatches
