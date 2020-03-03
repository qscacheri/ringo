import React, { Component } from "react";
import { connect } from "react-redux";
import Draggable from 'react-draggable'; // The default
import '../../css/QuaxObject.css';
import Sketch from "react-p5";

import QuaxObject from './QuaxObject'

class P5Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.setup = (p5, canvasParentRef) => {
      p5.createCanvas(500, 500).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    };
    this.draw = p5 => {
      p5.background(0);
      p5.ellipse(40, 40, 70, 70);
      // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
      this.x++;
    };

  }
  render() {
    return (
      <Draggable>
        <div>
          <Sketch setup={this.setup} draw={this.draw} />

        </div>
      </Draggable>)
  }
}

export default P5Canvas;