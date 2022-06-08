import { path } from 'd3-path';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { ActivePatchCable } from '../lib/PatchCable';
import { Point } from '../lib/types';
import { useProjectStore } from './ProjectProvider';

interface ActivePatchCableComponentProps {
  activePatchCable: ActivePatchCable;
  debug?: boolean;
}

const STROKE_WIDTH = 2;

const getPath = (p1: Point, p2: Point, width: number, height: number) => {
  const p = path();
  const startX = p2.x > p1.x ? width : STROKE_WIDTH;
  const startY = p2.y > p1.y ? height : STROKE_WIDTH;
  const endX = p2.x > p1.x ? STROKE_WIDTH : width;
  const endY = p2.y > p1.y ? STROKE_WIDTH : height;
  p.moveTo(startX, startY);
  const cp1 = { x: startX, y: height / 2 };
  const cp2 = { x: endX, y: height / 2 };
  p.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, endX, endY);

  return { path: p.toString(), cp1, cp2 };
};

export const ActivePatchCableComponent = observer(
  ({ activePatchCable, debug = true }: ActivePatchCableComponentProps) => {
    const { metaDataStore } = useProjectStore();

    const [p1, p2] = useMemo(() => {
      const id = activePatchCable.getTerminalId();
      const bounds = document
        .querySelector(`[data-terminal-id="${id}"]`)!
        .getBoundingClientRect();
      const p1: Point = {
        x: bounds.x + bounds.width / 2,
        y: bounds.y + bounds.height / 2,
      };
      const p2 = metaDataStore.mousePos;
      return [p1, p2];
    }, [metaDataStore.nodeBounds, metaDataStore.mousePos]);

    const x = p2.x > p1.x ? p1.x - STROKE_WIDTH : p2.x;

    const y = p2.y > p1.y ? p1.y : p2.y;
    const width = Math.abs(p2.x - p1.x);
    const height = Math.abs(p2.y - p1.y);

    const bezier = getPath(p1, p2, width, height);

    return (
      <svg
        className="fixed bg-none pointer-events-none"
        style={{
          left: x + 'px',
          top: y - STROKE_WIDTH + 'px',
          width: width + STROKE_WIDTH + 'px',
          height: height + STROKE_WIDTH + 'px',
        }}
        width={width}
        height={height}
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 1 }} />
            <stop
              offset="25%"
              style={{ stopColor: 'rgb(255,0,0)', stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: 'rgb(255,0,255)', stopOpacity: 1 }}
            />
            <stop
              offset="75%"
              style={{ stopColor: 'rgb(255,0,0)', stopOpacity: 1 }}
            />

            <stop
              offset="100%"
              style={{ stopColor: 'white', stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        {/* debug control point visualizer */}
        {debug && (
          <circle cx={bezier.cp1.x} cy={bezier.cp1.y} r={5} fill="red" />
        )}
        {debug && (
          <circle cx={bezier.cp2.x} cy={bezier.cp2.y} r={5} fill="blue" />
        )}
        <path
          fill="none"
          stroke="url(#grad1)"
          className="PatchCable"
          style={{
            pointerEvents: 'none',
            cursor: 'pointer',
          }}
          strokeWidth={2}
          strokeLinecap="round"
          d={bezier.path}
        />
      </svg>
    );
  }
);
