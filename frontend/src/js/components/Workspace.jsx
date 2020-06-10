import React, { useState, useRef, useContext, useEffect } from "react";
import OBJECT_TYPES from '../constants/object-types';
import RingoObject from './RingoObject'
import '../../css/Workspace.css';
import PatchCable from "./PatchCable";
import RingoButton from './RingoButton'
import ProcessorTree from '../utils/ProcessorTree'
import RingoMessage from "./RingoMessage";
import RingoThree from './RingoThree'
import RingoSlider from './RingoSlider'
import Processor, { Context } from './Processor'
import IOLetDescriptionPopup from './IOletDescriptionPopup'
import { PatchCableContext } from './PatchCableManager'
import Toolbar from "./Toolbar";
import h2tml2canvas from 'html2canvas'
const axios = require('axios')
const Url = require('url-parse');
const queryString = require('query-string')

function Workspace({ processor }) {
    const ProcessorContext = useContext(Context)
    const PatchCableManager = useContext(PatchCableContext)
    const [mousePosition, setMousePostion] = useState()
    const [locked] = useState(false)
    const [hasFocus, setHasFocus] = useState(true)
    const [infoPopup, setInfoPopup] = useState({
        visible: false,
        position: { x: 0, y: 0 },
        text: ""
    })
    const [dimensions, setDimensions] = useState({width: 0, height: 0})
    let ref = useRef(null)
    const [canvas, setCanvas] = useState(false)

    const loadPatchFromServer = () => {
        let { query } = new Url(window.location.href)      
        query = queryString.parse(query) 
        axios.get('/patch', {params: {id: query.id}}).then((res) => {
            console.log(res);
            
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadPatchFromServer()        
    }, [])

    const generateThumbnail = async () => {
            if (!ref) return
            h2tml2canvas(ref.current).then((c) => {
                const imgData = c.toDataURL('image/png')
                console.log(imgData);
                
                setCanvas(imgData)                
            })
        
    }

    useEffect(() => {

    })
    const createObject = (type) => {
        Processor.addObject(type, 200, 200);
    }

    const handleLock = () => {
        ProcessorTree.toggleLock()
    }

    const renderRingoObjects = () => {
        const objects = []
        for (let i in ProcessorContext.objects) {
            let currentObject = ProcessorContext.objects[i]
            let sharedProps = {
                key: i,
                id: i,
                processor,
                text: currentObject.text,
                position: { x: currentObject.position.x, y: currentObject.position.y },
                numInlets: currentObject.numInlets,
                numOutlets: currentObject.numOutlets,
                updateShowInfo: updateShowInfo,
                isLocked: locked,
                offsets: {x: ref.current.offsetLeft, y: ref.current.offsetTop}
            }
            
            switch (ProcessorContext.objects[i].getType()) {
                case OBJECT_TYPES.BUTTON:
                    objects.push(<RingoButton {...sharedProps} />)
                    break;
                case OBJECT_TYPES.MESSAGE:
                    objects.push(<RingoMessage {...sharedProps} />)
                    break;
                case OBJECT_TYPES.THREE_CANVAS:
                    objects.push(<RingoThree {...sharedProps} />)
                    break;
                case OBJECT_TYPES.SLIDER:
                    objects.push(<RingoSlider {...sharedProps} />)
                    break;
                default:
                    objects.push(<RingoObject {...sharedProps} />)
                    break;
            }
        }
        return objects
    }

    const renderPatchCables = () => {        
        const patchCables = []
        for (let i in PatchCableManager.patchCables) {            
            if (i === PatchCableManager.activeCableID)
                patchCables.push(<PatchCable
                    key={i}
                    pos1={PatchCableManager.patchCables[i].getActivePosition(PatchCableManager.activeCableType)}
                    pos2={mousePosition}
                />)
            else
                patchCables.push(<PatchCable
                    key={i}
                    pos1={PatchCableManager.patchCables[i].outObject.pos}
                    pos2={PatchCableManager.patchCables[i].inObject.pos}
                />)
        }
        return patchCables
    }

    function updateShowInfo(visible, position, id, ioletType, index) {
        const object = ProcessorContext.objects[id]
        const type = (object.type).toLowerCase()
        const description = object.getIOLetDescription(ioletType, index)
        setInfoPopup({ visible, position, text: type + ": " + description })
    }

    function handleMouseMove(e) {
        if (!PatchCableManager.activeCableID === -1) return
        setMousePostion({
            x: e.pageX - ref.current.offsetLeft,
            y: e.pageY - ref.current.offsetTop
        })
    }

    function handleClick() {
        ProcessorContext.resume()
        setHasFocus(true)
        PatchCableManager.handleClick(null)
        // generateThumbnail()
        // ProcessorTree.setSelected(-1)
    }

    function handleKeyDown(e) {
        if (!hasFocus) return
        // CREATE NEW OBJECT
        if (e.key === 'n' || e.key === 'N') {
            ProcessorContext.addObject(OBJECT_TYPES.EMPTY, mousePosition.x, mousePosition.y); 
            return;
        }

        else if (e.key === 'm' || e.key === 'M') {
            ProcessorContext.addObject(OBJECT_TYPES.MESSAGE, mousePosition.x, mousePosition.y); 
            return;
        }

        else if (e.key === 's' || e.key === 'S') {
            ProcessorContext.addObject(OBJECT_TYPES.SLIDER, mousePosition.x, mousePosition.y); 
            return;
        }

        else if (e.key === 'l' || e.key === 'L') {
            ProcessorContext.toggleLock()
            return;
        }

        else if (e.key === 'p' || e.key === 'P') {
            const state = ProcessorTree.save()
            localStorage.setItem('session', JSON.stringify(state));
            return;
        }

        // DELETE OBJECT
        if (e.keyCode === 8) {
            ProcessorContext.deleteSelectedObject()
        }
    }    

    return (
        <div className='WorkSpace' ref={ref} tabIndex="0" onMouseMove={handleMouseMove} onKeyDown={handleKeyDown} onClick={handleClick}>
            <Toolbar createObject={createObject} takeFocus={() => setHasFocus(false)}/>
            {renderPatchCables()}
            {renderRingoObjects()}
            {infoPopup.visible ? <IOLetDescriptionPopup
                position={infoPopup.position}
                text={infoPopup.text} /> : null
            }
        </div>
    )
}

export default Workspace
