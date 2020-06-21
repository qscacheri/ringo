import React, { useState, useRef } from 'react'
import "../../css/PopupMenu.css"

const PopupMenu = ({ children, buttonStyleName, menuStyleName }) => {

    let ref = useRef(null)
    const [visible, setVisible] = useState(false)

    const handleClick = (e) => {
        e.stopPropagation()
        setVisible(!visible)
    }
    
    return (
        <div className={`_PopupMenu ${buttonStyleName}`}>
            <svg className="_popupMenuButton" onClick={handleClick} viewBox="0 0 100 100">
                <circle cx="-30" cy="50" r="20"></circle>
                <circle cx="40" cy="50" r="20"></circle>
                <circle cx="110" cy="50" r="20"></circle>
            </svg>
            {visible ? (
                <div className={`_popupMenuOptions ${menuStyleName}`}>
                    {children}
                </div>
            ):null}
        </div>
    )
}

export default PopupMenu
