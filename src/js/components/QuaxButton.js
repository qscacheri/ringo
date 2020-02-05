import React, { Component } from "react";
import { connect } from "react-redux";
import Draggable from 'react-draggable'; // The default
import '../../css/QuaxObject.css';
class ConnectedQuaxButton extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <Draggable>
                <div>
                
                </div>
            </Draggable>
        )
    }

}