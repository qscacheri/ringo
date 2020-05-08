/* eslint-disable */

import React from "react";
import OBJECT_TYPES from '../constants/object-types';
import '../../css/Toolbar.css';
import Processor from "../utils/ProcessorTree";
 

function Toolbar() {

    const createObject = (type) => {
        Processor.addObject(type)
    }

        return (
            <div className="Toolbar">
                <div className="Header">
                    <h1>Ringo</h1>
                </div>
                <div className="Controls">
                    <button className="ToolbarButton NewObject" onClick={() => {createObject(OBJECT_TYPES.EMPTY)}}>New Object</button>
                    <button className="ToolbarButton NewMessage" onClick={() => {createObject(OBJECT_TYPES.MESSAGE)}}>New Message</button>
                </div>
            </div>
        )
}

export default Toolbar;
