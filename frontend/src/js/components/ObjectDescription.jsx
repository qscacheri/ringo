import React from "react";

function ObjectDescription({name, description}) {
    return (
    <li>{name.toLowerCase()}
        <ul>
        <li>{description}</li>
        </ul>
    </li>)
}

export default ObjectDescription