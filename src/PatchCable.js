import React, { Component } from 'react';


class PatchCable extends Component {
    constructor(props)
    {
        super(props);
        this.state = {

            cableGrabbed: false,

            startPos: {
                x: this.props.x1,
                y: this.props.y1
            },
            endPos: {
                x: this.props.x2,
                y: this.props.y2
            }
        }
    }

    render() {
        var x1 = this.state.startPos.x;
        var y1 = this.state.startPos.y;

        var x2 = this.state.endPos.x;
        var y2 = this.state.endPos.y;
        var strokeWidth = 2;

      return (
          <svg className = "PatchCable">
              <line x1={this.state.startPos.x} y1={this.state.startPos.y} x2={this.state.endPos.x} y2={this.state.endPos.y} style={{strokeWidth, stroke:'rgb(255,0,0)'}}></line>
          </svg>
      );
    }

}

class PatchCableList extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            patchCables: {}
        }
        // this.state.patchCables["test"] = {
        //     startPos: {
        //         x: 0,
        //         y: 0,
        //     },
        //     endPos: {
        //         x: 100,
        //         y: 100
        //     }
        // }
        console.log(this.props.children);
    }

    newPatchCable()
    {

    }



    handleKeyPress(e)
    {
        // if (e.key === 'n')
    }

    render(){
        return <div onKeyPress={this.handleKeyPress} style={{borderStyle: "solid", width: "100%", height: "1000px"}}>
        {
            Object.keys(this.state.patchCables).map(function(key) {
                console.log(key);
                  return <PatchCable
                  x1={this.state.patchCables[key].startPos.x}
                  y1={this.state.patchCables[key].startPos.y}
                  x2={this.state.patchCables[key].endPos.x}
                  y2={this.state.patchCables[key].endPos.y}>
                  </PatchCable>
                }.bind(this))
        }
        {this.props.children}

        </div>
    }
}

export default PatchCableList;
