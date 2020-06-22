/* eslint-disable */

import React, { useState } from "react";
import '../../css/Header.css';
import { Link, Redirect } from "react-router-dom";
import hamburgerIcon from '../../assets/hamburger.svg'
import Sidebar from './Sidebar'

function Header() {
    const [sidebarVisible, setSidebarVisible] = useState(false)

    return (
        <div className="Header">
            <h1 className="Title">Ringo</h1>
            <img className="hamburgerMenu" src={hamburgerIcon} onClick={() => setSidebarVisible(!sidebarVisible)} />
            <Sidebar visible={sidebarVisible} onCloseButtonPressed={() => setSidebarVisible(false)}>
                <Link className="sideBarItem" to="my-patches" onClick={()=>setSidebarVisible(false)}>My Patches</Link>
                <Link className="sideBarItem" to="about" onClick={()=>setSidebarVisible(false)}>About</Link>
            </Sidebar>
        </div>
    )
}

export default Header;
