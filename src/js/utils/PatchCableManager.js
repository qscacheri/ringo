class PatchCableManagerClass {
    constructor() {
        this.patchCables = {}
        this.userGrabbedPatchCable = false
        this.activeCableID = -1
    }

    handleClick(ioletInfo) {
        console.log(ioletInfo);        
        if (this.userGrabbedPatchCable == false) this.newPatchCable(ioletInfo) 
        else this.checkCableCompatiblity()
    }

    newPatchCable(ioletInfo) {        
        this.userGrabbedPatchCable = true
        const cableID = new Date().getTime()
        this.activeCableID = cableID
        const newPatchCable = {
            pos1: {
                x: ioletInfo.position.x,
                y: ioletInfo.position.y
            },
            pos2: {
                x: 0,
                y: 0
            }
        }
        this.patchCables[cableID] = newPatchCable;
    }

    checkCableCompatiblity() {

    }
}

export default new PatchCableManagerClass()