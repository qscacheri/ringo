import { observable } from 'mobx';
import { RingoNodeAttribute } from './nodes/core/RingoNode';

export type SerializedNodeAttributeList = Record<string, RingoNodeAttribute>

export class RingoNodeAttributeList {
    attributes: Map<string, RingoNodeAttribute> = observable.map(
        new Map<string, RingoNodeAttribute>()
    );

    constructor(attributes?: RingoNodeAttribute[]) {
        if (attributes) {
            attributes.forEach((attr) => {
                this.attributes.set(attr.name, attr);
            });
        }
    }

    get(key: string): RingoNodeAttribute {
        const attribute = this.attributes.get(key);
        if (!attribute) {
            throw new Error(`Attribute ${key} not found`);
        }
        return attribute;
    }

    set(key: string, value: unknown) {
        const currentVal = this.get(key);
        this.attributes = this.attributes.set(key, {
            name: key,
            value,
            type: currentVal.type,
        });
    }

    serialize() {
        const output: any = {};
        this.attributes.forEach((attr) => {
            output[attr.name] = attr
        });
        return output;
    }

    static deserialize(input: SerializedNodeAttributeList) {
        const output: RingoNodeAttribute[] = [];
        Object.entries(input).forEach(([key, { name, type, value, options }]) => {
            output.push({
                name,
                value,
                type,
                options
            });
        })
        return new RingoNodeAttributeList(output);
    }
}

