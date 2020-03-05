import IOLet from './IOLet'
import React, { Component } from "react";

function IOLetStrip(props)
{

    var iolets = [];
    let type = props.connectionType;
    for (let i = 0; i < props.numIOLets; i++) {
        iolets.push(<IOLet key={props.id + ":" + {type} + "" + i} ioletIndex={i} parentId={props.id} connectionType={type}></IOLet>)
    }

    return (
        <div className="IOLetStrip" onClick={e=>e.stopPropagation()}>
            { iolets }
        </div>
    );
    
}

export default IOLetStrip