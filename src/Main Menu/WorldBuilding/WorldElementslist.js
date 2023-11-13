import React from 'react'
import WorldElement from './WorldElement'
export default function WorldElementslist({worldElements}) {
    return (
        worldElements.map(worldElement => {
            return <WorldElement key={worldElement.id}  worldElement={worldElement} />
        }))}