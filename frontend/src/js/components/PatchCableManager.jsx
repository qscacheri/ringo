import React, { useState } from 'react'

export const PatchCableContext = React.createContext()

export class PatchCable {
    static receiverToPatchCable = (outletID, inletID) => {
        const outObjectID = outletID.split(':')[0]
        const outletIndex = outletID.split(':')[1]
        const inObjectID = outletID.split(':')[0]
        const inletIndex = outletID.split(':')[1]

        const pc = new PatchCable('pc-' + outObjectID.replace('ro-', ''))    
        pc.outObject = {
            id: outObjectID,
            ioletID: outletID,
            ioletIndex: outletIndex,
        }
        pc.inObject = {
            id: inObjectID,
            ioletID: inletID,
            ioletIndex: inletIndex,
        }
        return pc
    }

    constructor(id) {
        if (id.id)
            this.fromJSON(id)
        else {

            this.id = id
            this.outObject = {
                id: '',
                ioletID: '',
                ioletIndex: 0,
                pos: {x: 0, y: 0},
            }
            this.inObject = {
                id: '',
                ioletID: '',
                ioletIndex: 0,
                pos: {x: 0, y: 0},
            }
        }
    }

    isConnectedToObject(id) {
        if (this.outObject.id == id || this.inObject.id == id)
            return true
        return false
    }

    isDuplicate() {

    }
    
    updateObject(data, type) {
        if (type === 'OUT') {
            this.outObject = data
            this.outObject.ioletID = this.outObject.id + ':' + this.outObject.ioletIndex + ':' + 'OUT'
        }
        else {
            this.inObject = data
            this.inObject.ioletID = this.inObject.id + ':' + this.inObject.ioletIndex + ':' + 'IN'
        }
    }

    getActivePosition(activeCableType) {  
        if (activeCableType === 'OUT')
            return this.outObject.pos
        else 
            return this.inObject.pos
    }

    getPosition(type, parentRef) { // ref is for offset of workspace on page
        const xOffset = parentRef.offsetLeft
        const yOffset = parentRef.offsetTop
        
        if (type === 'OUT') {
            if (!this.outObject.ref) return 0
            const boundingRect = this.outObject.ref.getBoundingClientRect()
            return {
                x: window.pageXOffset + boundingRect.x + (boundingRect.width / 2) - xOffset,
                y: window.pageYOffset + boundingRect.y + (boundingRect.height / 2) - yOffset
            }
        }
        else {
            if (!this.inObject.ref) return 0
            const boundingRect = this.inObject.ref.getBoundingClientRect()
            return {
                x: window.pageXOffset + boundingRect.x + (boundingRect.width / 2) - xOffset,
                y: window.pageYOffset + boundingRect.y + (boundingRect.height / 2) - yOffset
            }
        }
    }

    toJSON() {
        return {
            id: this.id,
            outObject: { ...this.outObject},
            inObject: { ...this.inObject},
        }
    }

    fromJSON(data) {
        this.id = data.id
        this.outObject = data.outObject
        this.inObject = data.inObject
    }

}

class PatchCableManager extends React.Component {

    constructor(props) {        
        super(props)
        this.state = {
            activeCableID: -1,
            activeCableType: '',
            patchCables: {},
            dimensions: {width: 0, height: 0}
        }

        this.handleClick = this.handleClick.bind(this)
        this.newPatchCable = this.newPatchCable.bind(this)
        this.updateRefs = this.updateRefs.bind(this)
        this.checkCableCompatiblity = this.checkCableCompatiblity.bind(this)
        this.updatePosition = this.updatePosition.bind(this)
        this.lastDeleted = -1
    }

    componentDidMount() {
        if (localStorage.getItem('patch')) {
            this.loadFromJSON(JSON.parse(localStorage.getItem('patch')).patchCables)
        }
        window.addEventListener('resize', () => this.setState({dimensions: {width: window.innerWidth, height: window.innerHeight}}))
    }

    componentDidUpdate() {
        const id = this.props.lastDeleted
        console.log(id);
        
        if (id === -1 || this.lastDeleted === this.props.lastDeleted) return

        console.log("updating patch cables");
        
        let numDeleted = 0
        const copy = this.state.patchCables
        for (let i in this.state.patchCables) {
            if (this.state.patchCables[i].isConnectedToObject(id)) {
                delete copy[i]
                numDeleted++
            }
        }
        console.log('Deleted ', numDeleted, ' patch cables');
        this.setState({patchCables: copy}, () => this.saveCables())
        this.lastDeleted = this.props.lastDeleted
    }

    saveCables() {
        const patch = JSON.parse(localStorage.getItem('patch'))
        patch.patchCables = this.getCablesAsJSON()
        localStorage.setItem('patch', JSON.stringify(patch))
        console.log(patch)
    }  

    updatePosition(ioletID, pos) {
        const type = ioletID.split(':')[2]
        let object
        if (type === 'OUT') {
            for (let i in this.state.patchCables) {
                if (this.state.patchCables[i].outObject.ioletID === ioletID) {
                    object = this.state.patchCables[i]
                    object.outObject.pos = pos
                    this.setState({patchCables: {...this.state.patchCables, [i]: object}})
                }
            }    
        }
        else {
            for (let i in this.state.patchCables) {
                if (this.state.patchCables[i].inObject.ioletID === ioletID) {
                    object = this.state.patchCables[i]
                    object.inObject.pos = pos
                    this.setState({patchCables: {...this.state.patchCables, [i]: object}})
                }
            }    
        }
    }

    handleClick (ioletInfo) {     
        if (!ioletInfo)  {
            delete this.state.patchCables[this.state.activeCableID]
            this.setState({patchCables: this.state.patchCables, activeCableID: -1})
            return   
        }
        
        if (this.state.activeCableID === -1) this.newPatchCable(ioletInfo)
        else this.checkCableCompatiblity(ioletInfo)
    }

    newPatchCable (ioletInfo) {
        const cableID = 'pc-' + new Date().getTime()
        this.setState({activeCableID: cableID})
        this.setState({activeCableType: ioletInfo.connectionType})
        
        const newPatchCable = new PatchCable(cableID)
        newPatchCable.updateObject({
            id: ioletInfo.objectID,
            ioletIndex: ioletInfo.ioletIndex,
            pos: {
                x: ioletInfo.position.x,
                y: ioletInfo.position.y
            }
        }, ioletInfo.connectionType)
        // this.state.patchCables[cableID] = newPatchCable;

        this.setState({patchCables: {...this.state.patchCables, [cableID]: newPatchCable}})
    }

    checkCableCompatiblity(ioletInfo) {
        if (ioletInfo.connectionType != this.state.activeCableType) {
            this.state.patchCables[this.state.activeCableID].updateObject({
                id: ioletInfo.objectID,
                ioletIndex: ioletInfo.ioletIndex,
                pos: ioletInfo.position

            }, ioletInfo.connectionType)

            this.props.connectObjects(this.state.patchCables[this.state.activeCableID].outObject, this.state.patchCables[this.state.activeCableID].inObject)
            this.setState({activeCableID: -1})
        }
        this.saveCables()
    }

    updateRefs(id, type, ioletIndex, ref) {
        for (let i in this.state.patchCables) {
            let currentPatchCable = this.state.patchCables[i] 
            if (currentPatchCable.isConnectedToObject(id)) {
               let ioletID = id + ':' + ioletIndex + ':' + type
                if (currentPatchCable.outObject.ioletID === ioletID) {
                    currentPatchCable.outObject.ref = ref
                }

                else if (currentPatchCable.inObject.ioletID === ioletID) {
                    currentPatchCable.inObject.ref = ref
                }
            }
        }
    }

    getCablesAsJSON() {
        let patchCables = {}
        console.log(patchCables);
        
        for (let i in this.state.patchCables) {     
                   
            patchCables[i] = this.state.patchCables[i].toJSON()            
        }        
        return patchCables
    }

    loadFromJSON(json) {
        for (let i in json) {
            this.state.patchCables[i] = new PatchCable(json[i])            
        }
    }

    render() {
        const value = {
            patchCables: this.state.patchCables,
            activeCableID: this.state.activeCableID,
            activeCableType: this.state.activeCableType,
            handleClick: this.handleClick,
            updatePosition: this.updatePosition,
            dimensions: this.dimensions
        }

        return (<PatchCableContext.Provider value={value}>
            {this.props.children}
        </PatchCableContext.Provider>
        )    
    }
}

export default PatchCableManager
