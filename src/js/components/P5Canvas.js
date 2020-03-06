import React, { Component, useState } from "react";
import Draggable from 'react-draggable'; // The default
import '../../css/P5Canvas.css';
import '../../css/QuaxObject.css';
import Sketch from "react-p5";
import IOLetStrip from './IOLetStrip.js'
import { IOLetType } from './IOLet.js'

function P5Canvas(props) {

  const [shapes, setShapes] = useState([])
  const [position, setPosition] = useState({ x: 0, y: 100 })

  let setup = (p5, canvasParentRef) => {
    console.log(canvasParentRef.getBoundingClientRect());
    let rect = canvasParentRef.getBoundingClientRect();
    p5.createCanvas(rect.width, rect.width).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  };

  let draw = p5 => {
    p5.fill(255, 0, 9);
    p5.background(255);
    p5.ellipse(position.x, 40, 70, 70);
    setPosition({ x: position.x + 1, y: 100 });

  };

  return (
    <Draggable>
      <div className="P5Canvas">
        <IOLetStrip numIOLets={props.numInlets} connectionType={IOLetType.In} />
        <div className="CanvasContainer">
          <Sketch setup={setup} draw={draw} />
        </div>
        <IOLetStrip />

      </div>
    </Draggable>)

}


export default P5Canvas;