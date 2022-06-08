import { observable } from 'mobx';
import { RingoNodeAttribute } from './nodes/core/RingoNode';

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
    return this.attributes;
  }
}
