import React, {useRef} from 'react'
import {  useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
 
export default function AddChapter({chapters, setChapters}) {
  const chapterNameRef = useRef()
  const navigate = useNavigate();
  function handleAddChapter(e) {
    const name = chapterNameRef.current.value
    if (name === '') return
    const newChapters = [...chapters]
    newChapters.push({ id: uuidv4(), name: name , events: []})
    setChapters(newChapters)
  navigate('../');
  }
    return (
      <div style={{marginLeft:20}}>
              <p>Chapter Name</p>
              <input ref={chapterNameRef} maxLength={50} type="text" />
              
              <button onClick={handleAddChapter} className='btn'>Add</button>
              
      </div>
    )
  }
  
