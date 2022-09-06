import { makeAutoObservable } from 'mobx';
import { Point, Rectangle } from '../lib/types';

export class UIStore {
    canvasBounds: Rectangle = { x: 0, y: 0, width: 0, height: 0 };
    canvasScroll: Point = { x: 0, y: 0 };
    constructor() {
        makeAutoObservable(this);
        this.setCanvasBounds = this.setCanvasBounds.bind(this);
        this.setCanvasScroll = this.setCanvasScroll.bind(this);

    }

    setCanvasBounds(bounds: Rectangle) {
        this.canvasBounds = bounds;
    }

    setCanvasScroll(scroll: Point) {
        this.canvasScroll = scroll;
    }
}
