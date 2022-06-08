import { makeAutoObservable } from 'mobx';
import { Rectangle } from '../lib/types';

export class UIStore {
  canvasBounds: Rectangle = { x: 0, y: 0, width: 0, height: 0 };
  constructor() {
    makeAutoObservable(this);
  }

  setCanvasBounds(bounds: Rectangle) {
    this.canvasBounds = bounds;
  }
}
