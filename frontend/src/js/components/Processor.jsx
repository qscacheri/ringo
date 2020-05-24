import React from 'react'
import * as Tone from 'tone'
import createObject from '../utils/object-creators'
import OBJECT_TYPES from '../constants/object-types';
// import PatchCableManager from './PatchCableManager'

const Context = React.createContext()
const Provider = Context.Provider

class Processor extends React.Component {
    constructor(props) {
        super(props)
        this.context = new AudioContext();
        Tone.setContext(this.context)
        this.state = {
            objects: {},
            patchCables: {},
            locked: false
        }
        this.addObject = this.addObject.bind(this)
        window.state = this.state
    }

    resume() {        
        if (this.context.state !== 'running') 
            this.context.resume()
    }

    addObject(type = OBJECT_TYPES.EMPTY, x, y) {
        
        const objectID = 'ro-' + new Date().getTime()
        console.log(objectID);

        this.state.objects[objectID] = createObject(this, type, {x, y})

        this.setState({objects: this.state.objects}, () => console.log(this.state))        
    }

    render() {
        const value = {
            ...this.state,
            addObject: this.addObject,
            resume: this.resume
        }

        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }


}
export {Context}
export default Processor
