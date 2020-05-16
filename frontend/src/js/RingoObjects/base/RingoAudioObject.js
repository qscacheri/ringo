import RingoObject from "./RingoObject";

class RingoAudioObject extends RingoObject {
    connect(outletIndex, inletIndex, inputID) {
        super.connect(outletIndex, inletIndex, inputID)
        const receiverObject = this.processor.objects[inputID]
        this.audioNode.connect(receiverObject.audioNode)
    }

    disconnect() {
        this.audioNode.disconnect()
    }
}

export default RingoAudioObject