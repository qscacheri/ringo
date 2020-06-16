import React, { useState, useRef } from 'react'
import "../../css/PopupMenu.css"

const PopupMenu = ({ visible, children, styleName, position = "top-right" }) => {
    const [ref, setRef] = useState(null)


    if (!visible) return null
   
    const style = {}
    if (ref) {
        console.log(position);
        
        const width = ref.getBoundingClientRect().width
        const height = ref.getBoundingClientRect().height
        console.log(width);
        
        switch (position) {
            case "top-right":
                style.top = -height
                style.left = width
                break;
        }

    }
    return (
        <div className={`_PopupMenu ${styleName}`} style={style} ref={setRef}>
            {children}
        </div>
    )
}

export default PopupMenu
