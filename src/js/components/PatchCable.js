import React, { Component } from 'react';


class PatchCable extends Component {
    constructor(props)
    {
        super(props);
    }

    handleClick(e)
    {

    }

    render() {                
        var strokeWidth = 2;
        var left = 0;
        var top = 0;
        var width = '1000px';
        var height = '1000px';

      return (
          <svg style={{position: "absolute", width, height, left, top, pointerEvents: "none"}} className = "PatchCable">
              <line onClick = {this.handleClick.bind(this)} x1={this.props.pos1.x} y1={this.props.pos1.y} x2={this.props.pos2.x} y2={this.props.pos2.y} style={{display: "inline", strokeWidth, stroke:'rgb(0,0,0)'}}></line>
          </svg>
      );
    }

}


export default PatchCable;
