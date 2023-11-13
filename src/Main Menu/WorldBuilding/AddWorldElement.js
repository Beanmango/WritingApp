import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
export default function AddWorldElement({setWorldElements, worldElements}) {
    const nameRef = useRef('')
    const navigate = useNavigate()
    function handleAdd() {
      const newName = nameRef.current.value;
      const isNameExists = worldElements.some((element) => element.listName === newName);
    
      if (isNameExists) {
        alert(`World element with name '${newName}' already exists.`);
      } else {
        const newElements = [...worldElements, { listName: newName, id: uuidv4(), array: [] }];
        setWorldElements(newElements);
        navigate('../');
      }
    }
  return (
    <div style={{marginLeft:40}}>
    <p>New World Building Element</p>
    <input type='text' ref={nameRef} maxLength={15}></input>   
    <button className='btn' onClick={handleAdd} >Add</button>
    </div>
  )
}
