import { RingoNodeAttributeList } from "../../RingoNodeAttributeList";
import { Terminal } from "../../Terminal";
import { RingoAttributeType, RingoNodeType } from "../../types";
import { RingoNode } from "./RingoNode";

export class IntNode extends RingoNode {
    getType(): RingoNodeType {
        return "float"
    }
    getInletLayout(): Terminal[] {
        return [{ name: "number", type: "any" }]
    }
    getOutletLayout(): Terminal[] {
        return [{ name: "float", type: "any" }]
    }
    getInitialAttributes(): RingoNodeAttributeList {
        return new RingoNodeAttributeList([{ name: "value", type: RingoAttributeType.number, value: 0 }])
    }

}