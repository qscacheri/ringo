import React, { Component } from 'react';


class PatchCable extends Component {
    constructor(props)
    {
        super(props);
    }

    handleClick(e)
    {
        console.log("Clicked path");
    }

    render() {        
        var x1 = this.props.x1;
        var y1 = this.props.y1;

        var x2 = this.props.x2;
        var y2 = this.props.y2;
        var strokeWidth = 2;
        var left = 0;
        var top = 0;
        var width = '1000px';
        var height = '1000px';

      return (
          <svg style={{position: "absolute", width, height, left, top, borderStyle:"solid", pointerEvents: "none"}} className = "PatchCable">
              <line onClick = {this.handleClick.bind(this)} x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} style={{display: "inline", strokeWidth, stroke:'rgb(0,0,0)'}}></line>
          </svg>
      );
    }

}


export default PatchCable;
