import RingoObject from "./RingoObject";

class RingoAudioObject extends RingoObject {
    connect(outletIndex, inletIndex, inputID) {
        super.connect(outletIndex, inletIndex, inputID)
        const receiverObject = this.processor.state.objects[inputID]
        this.audioNode.connect(receiverObject.audioNode)
    }

    disconnect() {
        this.audioNode.disconnect()
    }

    resume() {
        console.log("started");
        
        if (this.audioNode.start) this.audioNode.start()
    }
}

export default RingoAudioObject