import React, { Component } from "react";
import { connect } from "react-redux";
import { addPatchCable, newConnection } from '../actions/index.js'
import inletOff from '../../../assets/inlet_off.svg'; // with import
import outletOff from '../../../assets/outlet_off.svg'; // with import

 
function mapStateToProps(state)
{
    return {
        activePatchCable: state.patchCableData.activePatchCable
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPatchCable: patchCable => dispatch(addPatchCable(patchCable)),
        newConnection: patchCable => dispatch(newConnection(patchCable))

    };
}

export const IOLetType =
{
    In: 0,
    Out: 1
}

class ConnectedIOLet extends Component
{
    constructor(props)
    {
        super(props);
        this.createPatchCable = this.createPatchCable.bind(this);

        this.myRef = React.createRef();
    }

    createPatchCable(e)
    {
        var boundingRect = this.myRef.current.getBoundingClientRect();
        return {
            id: new Date().getTime(),
            objectId: parseInt(this.props.parentId),
            ioletIndex: this.props.ioletIndex,
            neededConnectionType: !this.props.connectionType,
            pos1: {
                x: boundingRect.x + (boundingRect.width / 2),
                y: boundingRect.y + (boundingRect.height / 2)
            },
            pos2: {
                x: 0,
                y: 0
            }
        }
    }

    handleClick(event)
    {
        if (this.props.activePatchCable.id == -1)
            this.props.addPatchCable(this.createPatchCable(event));
        else if (this.props.activePatchCable.neededConnectionType == this.props.connectionType)
        {
            var inletId;
            var outletId;
            
            if (this.props.connectionType == IOLetType.In)
            {                
                outletId = this.props.activePatchCable.objectId;
                inletId = parseInt(this.props.parentId);
            }

            else
            {           
                inletId = this.props.activePatchCable.objectId;
                outletId = parseInt(this.props.parentId);
            }            

            var boundingRect = this.myRef.current.getBoundingClientRect();
            this.props.newConnection({
                inObject: 
                {
                    id: inletId, 
                    ioletIndex: 0
                },

                outObject:
                {
                    id: outletId, 
                    ioletIndex: this.props.ioletIndex
                },
                
                position: {
                    x: boundingRect.x + (boundingRect.width / 2),
                    y: boundingRect.y + (boundingRect.height / 2),
                }
            })

            console.log(this.props.activePatchCable.id);
            console.log(this.props.parentId);
            
            
        }
    }
    
    render()
    {
        const sourceImage = this.props.connectionType == IOLetType.In ? inletOff : outletOff
        return (
                <img ref={this.myRef} onClick={this.handleClick.bind(this)} src={sourceImage} style={{ width: "10%", margin: "0px" }}></img>
        );
 
    }
}

const IOLet = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedIOLet);
export default IOLet;
