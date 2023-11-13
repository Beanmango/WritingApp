import React from 'react'
import WorldElementslist from './WorldElementslist'
import './WorldBuildingMain.css'
import { Link } from 'react-router-dom'
export default function WorldBuildingMain({setWorldElements, worldElements}) {
    console.log(worldElements)
  return (
  
  <>
    <div id='WEContainer'>
        <div id='WEInnerCon'>
    <   WorldElementslist worldElements={worldElements}/>
    <Link className='WorldBtn' to={'./Add'}>
      <p>Add Costume</p>
    </Link>
    </div>
    </div>
    </>
  )
}
