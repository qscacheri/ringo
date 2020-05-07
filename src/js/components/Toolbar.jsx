/* eslint-disable */

import React from "react";
import { OBJECT_TYPES } from '../constants/object-types';
import { OBJECT_CONFIGS } from '../constants/object-configs';
import '../../css/Toolbar.css';
 

class Toolbar extends React.Component {
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
    export default Toolbar;
