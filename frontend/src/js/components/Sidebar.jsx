import React, { useState, useRef } from 'react'
import '../../css/Sidebar.css'
import { NotEqualStencilFunc } from 'three'

function Sidebar({stylename, children}) {
    const [visible, setVisible] = useState(false)
    const className = visible ? 'items visible' : 'items'
    let ref = useRef(null)

    const getStyle = () => {
        if (!ref.current) return {}

        const width = ref.current.getBoundingClientRect().width
        if (!visible) return {right: -width, transition: 'right .3s'}
        else return {right: 0, transition: 'right .3s'}
    }

    return (<div className='_Sidebar'>
        <div className='sidebarButton' onClick={()=>setVisible(!visible)}>•••</div>
        <div className={className} ref={ref} style={getStyle()}>
            {children}
        </div>
    </div>)
}

export default Sidebar