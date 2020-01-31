import React, { Component } from "react";
import { connect } from "react-redux";
import { addObject } from '../actions/index.js';
import { OBJECT_TYPES } from '../constants/object-types';
import { OBJECT_CONFIGS } from '../constants/object-configs';

import QuaxObject from './QuaxObject'
import '../../css/index.css';


function mapStateToProps(state) {
    return {
        objects: state.objects
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addObject: object => dispatch(addObject(object))
    };
}


class ConnectedApp extends Component {

    constructor(props)
    {
        super(props);
        this.createQuaxObject = this.createQuaxObject.bind(this);
    }

    handleKeyDown(event) {
        // CREATE NEW OBJECT
        if (event.key == 'n' || event.key == 'N') {
            var newObject = OBJECT_CONFIGS[OBJECT_TYPES.EMPTY];
            newObject.id = new Date().getTime();
            newObject.position = {
                x: this.state.mousePosition.x,
                y: this.state.mousePosition.y,
            }
            this.props.addObject(newObject);
            return;
        }
    }

    handleMouseMove(event) {
        this.setState({
            mousePosition: {
                x: event.clientX,
                y: event.clientY
            }
        })
    }
    
    createQuaxObject(k)
    {
        return <QuaxObject key={k} id={k} position={this.props.objects[k].position} numInlets={this.props.objects[k].numInlets} numOutlets={this.props.objects[k].numOutlets}></QuaxObject>
    }

    render() {

        return (
            <div className="App" tabIndex="0" onMouseMove={this.handleMouseMove.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}>
                {
                    Object.keys(this.props.objects).map(this.createQuaxObject)
                }
            </div>)
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedApp);
export default App;
