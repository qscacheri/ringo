import React, { useState } from 'react'

export const PatchCableContext = React.createContext()

class PatchCableManager extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeCableID: -1,
            activeCableType: '',
            patchCables: {}
        }

        this.handleClick = this.handleClick.bind(this)
        this.newPatchCable = this.newPatchCable.bind(this)

    }
    handleClick (ioletInfo) {
        if (this.state.activeCableID === -1) this.newPatchCable(ioletInfo)

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

            // ProcessorTree.connectObjects(this.patchCables[this.activeCableID].outObject, this.patchCables[this.activeCableID].inObject)
            this.setState({activeCableID: -1})
        }
    }

    updateRefs(id, type, ioletIndex, ref) {
        for (let i in this.state.patchCables) {
            let currentPatchCable = this.patchCables[i] 
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
        return ( <PatchCableContext.Provider value={patchCables, activePatchCableID, handleClick}>
            {this.props.children}
        </PatchCableContext.Provider>
        )    
    }
}

export default PatchCableManager
