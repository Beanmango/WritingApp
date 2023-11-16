
import React, { useState,useRef } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
export default function ViewObject({ setWorldElements, worldElements }) {
    const [isEditPage,setEdit] = useState(false)
    const location = useLocation()
    let element = location.state
    console.log(element)
    function handleEdit(){
        if(isEditPage){
            const newArray = [...myArray]
            const editedElement = {name:nameRef.current.value, desc:descRef.current.value, id:element.id}
            newArray[elementIndex]=editedElement
            const newElements = [...worldElements]
            newElements[matchingElementIndex].array =newArray
            setWorldElements(newElements)
            const currentLocation = window.location.pathname;
            navigate(currentLocation, {state:editedElement})
        }
        setEdit(!isEditPage)
    }

    function handleDelete(){
        const newArray = myArray.filter(elementTemp => elementTemp.id !== element.id)
            const newElements = [...worldElements]
            newElements[matchingElementIndex].array =newArray
            setWorldElements(newElements)
            navigate('..')
        }
    
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
  let elementIndex;
let matchingElementIndex;

if (displayName) {
  matchingElementIndex = worldElements.findIndex((element) => element.listName === displayName);

  if (matchingElementIndex !== -1) {
    matchingElement = worldElements[matchingElementIndex];
    myArray = matchingElement.array;
    elementIndex = myArray.findIndex((item) => item.id === element.id);
  }
}
  return (
    <div style={{width:'80vw', marginLeft:'5vh'}}>
   {!isEditPage ? (
  <div style={{ alignSelf: 'center' }}>
    <div>
      <p>{element.name}</p>
    </div>
    <div style={{ overflowY:'auto', maxHeight:'80vh'}}>
    <p>{element.desc}</p>
    </div>
  </div>
) : (<div >
    <p>New {displayName}</p>
    <input type='text' ref={nameRef} maxLength={15} defaultValue={element.name}></input>   
    <textarea ref={descRef} type="text" id="discIn">{element.desc}</textarea>
    </div>)}
    <div style={{display:'flex', flexDirection:'row'}}>
<button onClick={handleEdit} className='btn'>{isEditPage? 'Save' : 'Edit'}</button>
<button onClick={handleDelete} className='btn'>Delete {element.name}</button>
</div>
</div>
  )
}
