import ProcessorTree from './ProcessorTree'

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
        console.log(ioletInfo.ref.getBoundingClientRect());


        if (this.userGrabbedPatchCable == false) this.newPatchCable(ioletInfo)
        else this.checkCableCompatiblity(ioletInfo)
    }

    update(id) {
        // for (let i in this.patchCables) {
        //     if (this.patchCables[i].id === id) {
        //         this.
        //     }
        // }
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
            console.log(this.patchCables[this.activeCableID]);
            
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
        if (this.outObject.id === id || this.inObject.id === id) return true
        return false
    }

    this.updateObject = function (data, type) {
        if (type === 'OUT')
            this.outObject = data
        else
            this.inObject = data
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