import React, {component} from 'react'
import * as Tone from 'tone'
import createObject from './object-creators'
import OBJECT_TYPES from '../constants/object-types';
import PatchCableManager from './PatchCableManager'

const Context = React.createContext()
const Provider = Context.Provider

class Processor extends React.component {
    constructor(props) {
        super(props)
        this.context = new AudioContext();
        Tone.setContext(this.context)
        this.state = {
            objects: {},
            patchCables: {},
            locked: false
        }
    }

    resume() {        
        if (this.context.state !== 'running') 
            this.context.resume()
    }

    addObject(type = OBJECT_TYPES.EMPTY, x, y) {
        const objectID = 'ro-' + new Date().getTime()
        // this.objects[objectID] = createObject(this, type, {x, y})
        this.setState({objects: {...objects, [objectID]: createObject(this, type, {x, y})}})
        // if (this.newObjectCallback) this.newObjectCallback()
    }

    render() {
        return (
            <Provider>
                {props.children}
            </Provider>
        )
    }


}