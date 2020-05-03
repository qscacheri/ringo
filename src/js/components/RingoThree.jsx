import React, { useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable'; // The default
import '../../css/RingoThree.css';
import { IOLetType } from './IOLet.js'
import IOLetStrip from './IOLetStrip.js'
import ProcessorTree from '../utils/ProcessorTree'
import * as THREE from "three";


function RingoThree(props) {
    let ref = React.createRef();
    const [isDrag, setIsDrag] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [inputDisabled, setInputDisabled] = useState(true);
    let myRef = useRef(null)
    useEffect(() => {
        const width = myRef.current.getBoundingClientRect().width
        const height = myRef.current.getBoundingClientRect().height

        // var scene = new THREE.Scene();
        // var camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
        // var renderer = new THREE.WebGLRenderer();
        // renderer.setSize( width, height );
        // myRef.current.appendChild( renderer.domElement);
        // var geometry = new THREE.BoxGeometry( 2, 2, 2 );
        // var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        // var cube = new THREE.Mesh( geometry, material );
        // console.log(cube);
        // scene.add( cube );
        // camera.position.z = 5;
        // var animate = function () {
        //   requestAnimationFrame( animate );
        //   cube.rotation.x += 0.01;
        //   cube.rotation.y += 0.01;
        //   renderer.render( scene, camera );
        // };
        // animate();
        // // === THREE.JS EXAMPLE CODE END ===
        // console.log(cube);
        ProcessorTree.initializeThree(props.id, width, height, (renderer) => {
            console.log("three has been initialized");
            myRef.current.appendChild(renderer.domElement);
        })
        

    }, [])

    function handleChange(e) {
        setTextValue(event.target.value);
    }


    function handleDrag(e, data) {
        setIsDrag(true);
    }


    function handleClick(e) {
        if (isDrag == false) {
            console.log("Clicked on object with id:", props.id);
            // this.setState({ inputDisabled: false });
            setInputDisabled(false);
            // this.ref.current.focus();
            ref.current.focus();
        }
        e.stopPropagation();
        setIsDrag(false);
    }

    return (
        <Draggable bounds='parent' onDrag={handleDrag} enableUserSelectHack={false} defaultPosition={{ x: props.position.x, y: props.position.y }}>
            <div className="RingoThree" onClick={handleClick}>
                <IOLetStrip className='Inlets' id={props.id} numIOLets={props.numInlets} connectionType={IOLetType.In} />
                    <div className='ThreeCanvas' ref={myRef}></div>
                <IOLetStrip className='Outlets' id={props.id} numIOLets={props.numOutlets} connectionType={IOLetType.Out} />
            </div>
        </Draggable>
    )


}

export default RingoThree;
