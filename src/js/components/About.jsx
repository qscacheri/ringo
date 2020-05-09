import React from "react";
import "../../css/About.css"
function About() {

    const coreObjects = ['+', 'Button', 'M2F(Midi to freq)', 'Metro', 'Number', 'Random', 'Scale']
    const audioObjects = ['~Dac', '~Gain', '~Input', '~Meter', '~Osc'];
    const threeObjects = ['Three.shape', 'Three.canvas']

    const getCoreObjects = () => {
        const objects = [];
        for (let i = 0; i < coreObjects.length; i++) {
            objects.push(<li key={i}>{ coreObjects[i] }</li>)
        }
        return objects;
    }

    const getAudioObjects = () => {
        const objects = [];
        for (let i = 0; i < audioObjects.length; i++) {
            objects.push(<li key={i}>{ audioObjects[i] }</li>)
        }
        return objects;
    }

    const getThreeObjects = () => {
        const objects = [];
        for (let i = 0; i < threeObjects.length; i++) {
            objects.push(<li key={i}>{ threeObjects[i] }</li>)
        }
        return objects;
    }

    


    return (<div className="About">
        <h1>Objects:</h1>
            <h2>Core:</h2>
            <ul>
                {getCoreObjects()}
            </ul>
            <h2>Audio:</h2>
            <ul>
                {getAudioObjects()}
            </ul>
            <h2>Audio:</h2>
            <ul>
                {getThreeObjects    ()}
            </ul>


    </div>)
}

export default About
