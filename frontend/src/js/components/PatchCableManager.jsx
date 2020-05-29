import React, { useState } from 'react'

export const PatchCableContext = React.createContext()

export class PatchCable {
    constructor(id) {
        if (id.id)
            this.fromJSON(id)
        else {

            this.id = id
            this.outObject = {
                id: '',
                ioletID: '',
                ioletIndex: 0,
                pos: {
                    x: 0,
                    y: 0,
                },
                ref: null
            }
            this.inObject = {
                id: '',
                ioletID: '',
                ioletIndex: 0,
                pos: {
                    x: 0,
                    y: 0,
                },
                ref: null
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

    getActivePosition(parentRef) {        
        const xOffset = parentRef.offsetLeft
        const yOffset = parentRef.offsetTop

        let boundingRect
        if (this.outObject.ref)
            boundingRect = this.outObject.ref.getBoundingClientRect()
        else
            boundingRect = this.inObject.ref.getBoundingClientRect()
        return {
            x: window.pageXOffset + boundingRect.x + (boundingRect.width / 2) - xOffset,
            y: window.pageYOffset + boundingRect.y + (boundingRect.height / 2) - yOffset
        }
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
            outObject: { ...this.outObject, ref: null },
            inObject: { ...this.inObject, ref: null },
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

    }
    handleClick (ioletInfo) {
        console.log(ioletInfo);
        
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
            ref: ioletInfo.ref,
            pos: {
                x: ioletInfo.position.x,
                y: ioletInfo.position.y
            }
        }, ioletInfo.connectionType)
        this.state.patchCables[cableID] = newPatchCable;
        this.setState({patchCables: this.state.patchCables})
    }

    checkCableCompatiblity(ioletInfo) {
        if (ioletInfo.connectionType != this.state.activeCableType) {
            this.state.patchCables[this.state.activeCableID].updateObject({
                id: ioletInfo.objectID,
                ioletIndex: ioletInfo.ioletIndex,
                ref: ioletInfo.ref,
                pos: ioletInfo.position

            }, ioletInfo.connectionType)

            this.props.connectObjects(this.state.patchCables[this.state.activeCableID].outObject, this.state.patchCables[this.state.activeCableID].inObject)
            this.setState({activeCableID: -1})
        }
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

    render() {
        const value = {
            patchCables: this.state.patchCables,
            activeCableID: this.state.activeCableID,
            handleClick: this.handleClick,
            updateRefs: this.updateRefs
        }

        return (<PatchCableContext.Provider value={value}>
            {this.props.children}
        </PatchCableContext.Provider>
        )    
    }
}

export default PatchCableManager
