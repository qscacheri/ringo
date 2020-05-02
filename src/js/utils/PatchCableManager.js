import ProcessorTree from './ProcessorTree'

class PatchCableManagerClass {
    constructor() {
        this.patchCables = {}
        this.userGrabbedPatchCable = false
        this.activeCableID = -1
    }

    handleClick(ioletInfo) {
        console.log(ioletInfo);
        if (this.userGrabbedPatchCable == false) this.newPatchCable(ioletInfo)
        else this.checkCableCompatiblity(ioletInfo)
    }

    newPatchCable(ioletInfo) {
        this.userGrabbedPatchCable = true
        const cableID = new Date().getTime()
        this.activeCableID = cableID
        this.activeCableType = ioletInfo.connectionType
        const newPatchCable = {
            pos1: {
                x: ioletInfo.position.x,
                y: ioletInfo.position.y
            },
            pos2: {
                x: 0,
                y: 0
            },
            outObject: {
                id: '',
                outletIndex: 0
            },
            inObject: {
                id: '',
                inletIndex: 0
            }
        }

        if (ioletInfo.connectionType === 'OUT')
            newPatchCable.outObject = {
                id: ioletInfo.objectID,
                outletIndex: ioletInfo.ioletIndex
            }
        else
            newPatchCable.inObject = {
                id: ioletInfo.objectID,
                inletIndex: ioletInfo.ioletIndex
            }

        console.log(newPatchCable);

        this.patchCables[cableID] = newPatchCable;
    }

    checkCableCompatiblity(ioletInfo) {
        if (ioletInfo.connectionType != this.activeCableType) {
            console.log('new connection!');
            this.patchCables[this.activeCableID].pos2 = ioletInfo.position
            if (ioletInfo.connectionType === 'OUT')
                this.patchCables[this.activeCableID].outObject = {
                    id: ioletInfo.objectID,
                    outletIndex: ioletInfo.ioletIndex
                }
            else
                this.patchCables[this.activeCableID].inObject = {
                    id: ioletInfo.objectID,
                    inletIndex: ioletInfo.ioletIndex
                }
            
            ProcessorTree.connectObjects(this.patchCables[this.activeCableID].outObject, this.patchCables[this.activeCableID].inObject)
            this.activeCableID = -1
            this.userGrabbedPatchCable = false
        }

    }
}

export default new PatchCableManagerClass()