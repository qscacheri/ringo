/* eslint-disable */

import React from "react";
import OBJECT_TYPES from '../constants/object-types';
import '../../css/Toolbar.css';
import Processor from "../utils/ProcessorTree";
import { Link } from "react-router-dom";
import ProcessorTree from "../utils/ProcessorTree";


function Toolbar({ locked, workspace}) {
    
    const createObject = (type) => {
        Processor.addObject(type, 200, 200);
    }

    const handleLock = () => {
        ProcessorTree.toggleLock()
    }

    return (
        <div className="Toolbar">
            <div className="Header">
                <h1 className="Title">Ringo</h1>
            </div>
            <div className="Controls">
                <div>
                    {workspace ? <button className="ToolbarButton NewObject" onClick={() => { createObject(OBJECT_TYPES.EMPTY) }}>New Object</button> : null}
                    {workspace ? <button className="ToolbarButton NewMessage" onClick={() => { createObject(OBJECT_TYPES.MESSAGE) }}>New Message</button>: null}
                </div>
                <div>
                    <button className="ToolbarButton" onClick={handleLock}>{ locked ? "Unlock" : "Lock" }</button>
                    <Link to='/about' className="ToolbarButton">About</Link>

                </div>
            </div>
        </div>
    )
}

export default Toolbar;
