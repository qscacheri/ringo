import RingoObject from "./RingoObject";

class RingoAudioObject extends RingoObject {
    addReceiver(outletIndex, inletIndex, inputID) {
        super.addReceiver(outletIndex, inletIndex, inputID)
        const receiverObject = this.processor.objects[inputID]
        this.audioNode.connect(receiverObject.audioNode)
    }
}

export default RingoAudioObject