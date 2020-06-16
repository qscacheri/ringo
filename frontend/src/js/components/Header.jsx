/* eslint-disable */

import React, {useState} from "react";
import OBJECT_TYPES from '../constants/object-types';
import '../../css/Header.css';
import Processor from "../utils/ProcessorTree";
import { Link } from "react-router-dom";
import ProcessorTree from "../utils/ProcessorTree";

import Sidebar from './Sidebar'

function Header({ locked, workspace}) {
    const [sidebarVisible, setSidebarVisible] = useState(false)

    return (
        <div className="Header">
            <div className="Header">
                <h1 className="Title">Ringo</h1>
                {/* <button onClick={()=>setSidebarVisible(!sidebarVisible)}>•••</button> */}
                <Sidebar visible={sidebarVisible}>
                    <Link to="my-patches">My Patches</Link>
                    <Link to="about">About</Link>

                </Sidebar>
            </div>
        </div>
    )
}

export default Header;
