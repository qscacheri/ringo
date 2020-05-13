import ProcessorTree from './ProcessorTree'

class PatchCableManagerClass {
    constructor() {
        this.patchCables = {}
        this.userGrabbedPatchCable = false
        this.activeCableID = -1
        this.onChange = null
        this.selectedCable = -1
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
}

export function PatchCable(id) {
    this.isConnectedToObject = function (id) {
        if (this.outObject.id == id || this.inObject.id == id) return true
        return false
    }

    this.updateObject = function (data, type) {
        if (type === 'OUT')
            this.outObject = data
        else
            this.inObject = data
    }

    this.getActivePosition = function () {
        let boundingRect
        if (this.outObject.ref)
            boundingRect = this.outObject.ref.getBoundingClientRect();

        else
            boundingRect = this.inObject.ref.getBoundingClientRect();

        return {
            x: window.pageXOffset + boundingRect.x + (boundingRect.width / 2),
            y: window.pageYOffset + boundingRect.y + (boundingRect.height / 2)
        }
        
    }

    this.getPosition = function (type) {
        if (type === 'OUT') {
            const boundingRect = this.outObject.ref.getBoundingClientRect();
            return {
                x: window.pageXOffset + boundingRect.x + (boundingRect.width / 2),
                y: window.pageYOffset + boundingRect.y + (boundingRect.height / 2)
            }
        }

        else {
            const boundingRect = this.inObject.ref.getBoundingClientRect();
            return {
                x: window.pageXOffset + boundingRect.x + (boundingRect.width / 2),
                y: window.pageYOffset + boundingRect.y + (boundingRect.height / 2)
            }
        }

    }

    this.id = id
    this.outObject = {
        id: '',
        ioletIndex: 0,
        pos: {
            x: 0,
            y: 0,
        },
        ref: null
    }

    this.inObject = {
        id: '',
        ioletIndex: 0,
        pos: {
            x: 0,
            y: 0,
        },
        ref: null
    }

}

export default new PatchCableManagerClass()