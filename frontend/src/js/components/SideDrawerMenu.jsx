import React from 'react'
import '../../css/SideDrawerMenu.css'
import {Link} from 'react-router-dom'

function SideDrawerMenu() {
    return (<div className="SideDrawerMenu">
        <Link to='about'>About</Link>
        <Link to='my-projects'>My Projects</Link>
        <Link to='discover'>Discover</Link>
    </div>)
}

export default SideDrawerMenu
