import React from "react";
import '../../css/IOLetDescriptionPopup.css'
function IOLetDescriptionPopup({text, position}) {
    return (
        <div className="IOLetDescriptionPopup" style={{left: position.x + 'px', top: position.y + 'px'}}>
            {text}
        </div>
    )
}

export default IOLetDescriptionPopup
