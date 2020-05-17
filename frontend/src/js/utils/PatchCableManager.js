import ProcessorTree from './ProcessorTree'
import { log } from 'three'

class PatchCableManagerClass {
    constructor() {
        this.patchCables = {}
        this.userGrabbedPatchCable = false
        this.activeCableID = -1
        this.onChange = null
    }

    handleClick(ioletInfo) {

        if (!ioletInfo) {
            delete this.patchCables[this.activeCableID]
            this.activeCableID = -1
            this.userGrabbedPatchCable = false
            return
        }

        if (this.userGrabbedPatchCable == false) this.newPatchCable(ioletInfo)
        else this.checkCableCompatiblity(ioletInfo)
    }

    updateDeleted(id) {
        let numDeleted = 0
        for (let i in this.patchCables) {
            if (this.patchCables[i].isConnectedToObject(id)) {
                delete this.patchCables[i]
                numDeleted++
            }
        }
        console.log('Deleted ', numDeleted, ' patch cables');

    }

    newPatchCable(ioletInfo) {
        this.userGrabbedPatchCable = true
        const cableID = new Date().getTime()
        this.activeCableID = cableID
        this.activeCableType = ioletInfo.connectionType

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
        console.log(newPatchCable);
        this.patchCables[cableID] = newPatchCable;
    }

    checkCableCompatiblity(ioletInfo) {
        if (ioletInfo.connectionType != this.activeCableType) {
            this.patchCables[this.activeCableID].updateObject({
                id: ioletInfo.objectID,
                ioletIndex: ioletInfo.ioletIndex,
                ref: ioletInfo.ref,
                pos: ioletInfo.position

            }, ioletInfo.connectionType)

            ProcessorTree.connectObjects(this.patchCables[this.activeCableID].outObject, this.patchCables[this.activeCableID].inObject)
            this.activeCableID = -1
            this.userGrabbedPatchCable = false
        }

    }

    updateRefs(id, type, ioletIndex, ref) {
        for (let i in this.patchCables) {
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

    getCablesAsJSON() {
        let patchCables = {}
        for (let i in this.patchCables) {
            patchCables[i] = this.patchCables[i].toJSON()
        }
        return patchCables
    }

    loadFromJSON(json) {
        for (let i in json) {
            this.patchCables[i] = new PatchCable(json[i])            
        }
    }
}

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

    getActivePosition() {
        let boundingRect
        if (this.outObject.ref)
            boundingRect = this.outObject.ref.getBoundingClientRect()
        else
            boundingRect = this.inObject.ref.getBoundingClientRect()
        return {
            x: window.pageXOffset + boundingRect.x + (boundingRect.width / 2),
            y: window.pageYOffset + boundingRect.y + (boundingRect.height / 2)
        }
    }
    getPosition(type) {
        if (type === 'OUT') {
            if (!this.outObject.ref) return 0
            const boundingRect = this.outObject.ref.getBoundingClientRect()
            return {
                x: window.pageXOffset + boundingRect.x + (boundingRect.width / 2),
                y: window.pageYOffset + boundingRect.y + (boundingRect.height / 2)
            }
        }
        else {
            if (!this.inObject.ref) return 0
            const boundingRect = this.inObject.ref.getBoundingClientRect()
            return {
                x: window.pageXOffset + boundingRect.x + (boundingRect.width / 2),
                y: window.pageYOffset + boundingRect.y + (boundingRect.height / 2)
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

export default new PatchCableManagerClass()