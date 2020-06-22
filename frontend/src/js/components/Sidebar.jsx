import React, { useState, useRef, useEffect } from 'react'
import '../../css/Sidebar.css'

function Sidebar({visible, stylename, children, onCloseButtonPressed, handleSelection}) {
    const className = visible ? `_Sidebar visible ${stylename}` : '_Sidebar'
    const [ref, setRef] = useState(null)
    
    const getStyle = () => {                
        if (!ref) return {}
        
        const width = ref.getBoundingClientRect().width
        
        if (!visible) return {right: -width, transition: 'right .3s'}
        else return {right: 0, transition: 'right .3s'}
    }
    

    return (<div ref={setRef} className={className} style={getStyle()} >
        <div className="_closeSidebar" onClick={onCloseButtonPressed}>X</div>
        <div className="items">
            {children}
        </div>
    </div>)
}

export default Sidebar