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
        // let boundingRect
        // if (this.outObject.ref)
        //     boundingRect = this.outObject.ref.getBoundingClientRect()
        // else
        //     boundingRect = this.inObject.ref.getBoundingClientRect()
        // return {
        //     x: window.pageXOffset + boundingRect.x + (boundingRect.width / 2) - xOffset,
        //     y: window.pageYOffset + boundingRect.y + (boundingRect.height / 2) - yOffset
        // }
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
        console.log(props);
        
        super(props)
        this.state = {
            activeCableID: -1,
            activeCableType: '',
            patchCables: {}
        }

        this.handleClick = this.handleClick.bind(this)
        this.newPatchCable = this.newPatchCable.bind(this)
        this.updateRefs = this.updateRefs.bind(this)
        this.checkCableCompatiblity = this.checkCableCompatiblity.bind(this)
        this.updatePosition = this.updatePosition.bind(this)

        if (localStorage.getItem('patch')) this.loadFromJSON(JSON.parse(localStorage.getItem('patch')))
    }

    updatePosition(ioletID, pos) {
        const type = ioletID.split(':')[2]
        if (type === 'OUT') {
            for (let i in this.state.patchCables) {
                if (this.state.patchCables[i].outObject.ioletID === ioletID) 
                    this.state.patchCables[i].outObject.pos = pos
            }    
        }
        else {
            for (let i in this.state.patchCables) {
                // console.log(this.state.patchCables[i].inObject.ioletID);
                // console.log(ioletID);
                if (this.state.patchCables[i].inObject.ioletID === ioletID) {
                    this.state.patchCables[i].inObject.pos = pos
                }
            }    
        }
        this.setState({patchCables: this.state.patchCables})
    }

    handleClick (ioletInfo) {     
        if (!ioletInfo)  {
            delete this.state.patchCables[this.state.activeCableID]
            this.setState({patchCables: this.state.patchCables, activeCableID: -1})
            this.props.updateCables(JSON.stringify(this.getCablesAsJSON()))
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
        this.state.patchCables[cableID] = newPatchCable;
        this.setState({patchCables: this.state.patchCables})
        this.props.updateCables(JSON.stringify(this.getCablesAsJSON()))
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
        this.props.updateCables(JSON.stringify(this.getCablesAsJSON()))
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
        for (let i in this.state.patchCables) {
            patchCables[i] = this.state.patchCables[i].toJSON()
        }
        return patchCables
    }

    loadFromJSON(json) {
        for (let i in json) {
            this.state.patchCables[i] = new PatchCable(json[i])            
        }

        // for (let i = 0; i < this.refCallbacks.length; i++) {
        //     console.log(i);
            
        //     this.refCallbacks[i]()
        // }
    }

    render() {
        const value = {
            patchCables: this.state.patchCables,
            activeCableID: this.state.activeCableID,
            activeCableType: this.state.activeCableType,
            handleClick: this.handleClick,
            updatePosition: this.updatePosition
        }

        return (<PatchCableContext.Provider value={value}>
            {this.props.children}
        </PatchCableContext.Provider>
        )    
    }
}

export default PatchCableManager
