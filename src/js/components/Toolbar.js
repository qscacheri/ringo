/* eslint-disable */

import React, { Component } from "react";
import { connect } from "react-redux";
import { addObject, exportState} from '../actions/actions.js';
import { OBJECT_TYPES } from '../constants/object-types';
import { OBJECT_CONFIGS } from '../constants/object-configs';
import '../../css/Toolbar.css';
 
function mapDispatchToProps(dispatch) {
    return {
        addObject: object => dispatch(addObject(object)),
        exportState: object => dispatch(exportState(object))
    };
}

class ConnectedToolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        var newObject = OBJECT_CONFIGS[OBJECT_TYPES.EMPTY];
        newObject.id = new Date().getTime();
        newObject.position = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        }   
        this.props.addObject(newObject);
    }

    handleSave(e)
    {
        this.props.exportState();
    }

    render() {
        return (
            <div className="Toolbar">
                <h1>Ringo</h1>
                {/* <form>
                    Patch Name:<input type="text"></input>
                </form>
                <button onClick={this.handleClick.bind(this)}>new object</button>
                <button onClick = { () => this.props.exportState() }>save</button>
                <button onClick = { () => this.props.exportState() }>load</button>
 */}
            </div>
        )
    }
}
    const Toolbar = connect(
        null,
        mapDispatchToProps
    )(ConnectedToolbar);
    export default Toolbar;
