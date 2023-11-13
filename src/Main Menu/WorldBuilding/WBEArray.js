import React from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import WBElist from './WBElist';
import './WBEArray.css'

export default function WBEArray({ setWorldElements, worldElements }) {
  const location = useLocation();
  const navigate = useNavigate()
  function decodeURLString(urlEncodedString) {
    return decodeURIComponent(urlEncodedString);
  }
 
  const pathSegments = location.pathname.split('/');
  const listName = pathSegments[pathSegments.length - 1];
  const displayName = decodeURLString(listName);
  let myArray = [];
  let matchingElement;
  if (displayName) {
    matchingElement = worldElements.find((element) => element.listName === displayName);
    console.log(matchingElement)
    if (matchingElement) {
      myArray = matchingElement.array;
    }
  }
  function handleDelete(){
    const newElements = worldElements.filter(worldElement=> worldElement.id !== matchingElement.id)
    setWorldElements(newElements)
    navigate('..')
  }

  return (
    <>
    <div id='background'>
        <div id='listCon'>
            <WBElist myArray={myArray} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', height: '100%', }}>
          <Link to={'./Add'} className='addBtn'><p>Add {displayName}</p></Link>
          <button className='addBtn' onClick={handleDelete}><p>Delete List</p></button>
       </div>  
    </div>

    </>
  );
}
