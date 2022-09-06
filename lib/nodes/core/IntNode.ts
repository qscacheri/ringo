import { isBang } from "../../bang";
import { isNumber } from "../../makeNumber";
import { RingoNodeAttributeList } from "../../RingoNodeAttributeList";
import { Terminal } from "../../Terminal";
import { RingoAttributeType, RingoNodeType } from "../../types";
import { RingoNode } from "./RingoNode";



export class IntNode extends RingoNode {

    receive(_: number, data: unknown): void {
        if (isBang(data)) {
            console.log("Received bang")
            this.send(0)
        }
        else {
            const num = isNumber(data)
            if (num !== undefined) {
                return
            }
            this.setAttribute("value", num)
            this.send(0)
        }
    }

    override getDataForOutlet(outlet: number, data?: unknown): unknown {
        return this.getAttribute("value").value
    }

    getType(): RingoNodeType {
        return "int"
    }

    getInletLayout(): Terminal[] {
        return [{ name: "number", type: "any" }]
    }

    getOutletLayout(): Terminal[] {
        return [{ name: "int", type: "any" }]
    }

    getInitialAttributes(): RingoNodeAttributeList {
        return new RingoNodeAttributeList([{ name: "value", type: RingoAttributeType.number, value: 0 }])
    }

}