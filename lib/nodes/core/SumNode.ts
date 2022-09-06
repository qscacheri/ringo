import { isBang } from "../../bang";
import { isNumber } from "../../makeNumber";
import { RingoNodeAttributeList } from "../../RingoNodeAttributeList";
import { Terminal } from "../../Terminal";
import { RingoAttributeType, RingoNodeType } from "../../types";
import { RingoNode } from "./RingoNode";

export class SumNode extends RingoNode {
    getType(): RingoNodeType {
        return "sum"
    }

    getInletLayout(): Terminal[] {
        return [{ name: "number1", type: "any", hot: true }, { name: "number2", type: "any" }]
    }

    getOutletLayout(): Terminal[] {
        return [{ name: "sum", type: "any" }]
    }

    getInitialAttributes(): RingoNodeAttributeList {
        return new RingoNodeAttributeList([
            { name: "number1", type: RingoAttributeType.number, value: 0 },
            { name: "number2", type: RingoAttributeType.number, value: 0 }

        ])
    }

    getDataForOutlet(outlet: number): unknown {
        const num1 = isNumber(this.getAttribute("number1").value)
        const num2 = isNumber(this.getAttribute("number2").value)
        if (num1 === undefined || num2 === undefined) {
            return undefined
        }
        switch (outlet) {
            case 0:
                return num1 + num2
            default:
                throw new Error("Invalid outlet")
        }
    }

    receive(inlet: number, data: unknown): void {
        console.log("sum received", inlet, data)

        switch (inlet) {
            case 0:
                if (isBang(data)) {
                    console.log("Sum received bang")
                    this.send(0)
                }
                else {
                    const newNum1 = isNumber(data)
                    this.setAttribute("number1", newNum1)
                    this.send(0)
                }
                break
            case 1:
                const newNum2 = isNumber(data)
                this.setAttribute("number2", newNum2)
                break
            default:
                throw new Error("Invalid inlet")
        }
    }

}