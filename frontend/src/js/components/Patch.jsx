import React, { useEffect } from 'react'
const Patch = ({patchName, patchID, handleSelection}) => {

    return (<div className="Patch" onClick={handleSelection}>
        <div>{patchName}</div>
    </div>)
}

export default Patch
