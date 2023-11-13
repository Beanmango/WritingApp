import { index } from 'd3';
import React, { useRef,useEffect,useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
export default function AddObject({ setWorldElements, worldElements }) {
    const location = useLocation();
    const nameRef = useRef('')
    const descRef = useRef('')
    const navigate = useNavigate()
    const pathSegments = location.pathname.split('/');
  const listName = pathSegments[pathSegments.length - 2];
  function decodeURLString(urlEncodedString) {
    return decodeURIComponent(urlEncodedString);
  }
  const displayName = decodeURLString(listName);
  let myArray = [];
  let matchingElement;
let matchingElementIndex;

if (displayName) {
  matchingElementIndex = worldElements.findIndex((element) => element.listName === displayName);

  if (matchingElementIndex !== -1) {
    matchingElement = worldElements[matchingElementIndex];
    myArray = matchingElement.array;
  }
}
console.log(matchingElementIndex)
  function handleAdd(){
    const newArray = [...myArray]
    newArray.push({name:nameRef.current.value, desc:descRef.current.value, id:uuidv4()})
    const newElements = [...worldElements]
    newElements[matchingElementIndex].array =newArray
    setWorldElements(newElements)
    navigate('..')
    

  }

  return (
    <div style={{marginLeft:40}}>
    <p>New {displayName}</p>
    <input type='text' ref={nameRef} maxLength={15}></input>   
    <textarea ref={descRef} type="text" id='discIn'> </textarea>
    <button className='btn' onClick={handleAdd}  >Add {displayName}</button>
    </div>
  )
}
