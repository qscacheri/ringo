import React, { useEffect } from 'react'
import Axios from 'axios'
import '../../css/MyProjects.css'

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS
const MyProjects = () => {
    useEffect(() => {
        const config = {headers: { Authorization: `Bearer ${token}` }}
        Axios.get(`${serverAddress}/my-projects`, config).then((res) => {

        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (<div className="MyProjects">

    </div>)
}

export default MyProjects
