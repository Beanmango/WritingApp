import React, { useRef, useState } from 'react';
import { useLocation,useNavigate,Link } from 'react-router-dom';

export default function ViewEvent({ chapters, setChapters }) {
    const nameRef = useRef('')
    const sumRef = useRef('')
    const location = useLocation();
    const event = location.state;
    
    const [isEditing, setEdit] = useState(false)
    const navigate = useNavigate();
    const chapter = chapters.find((chapter) => {
        return Array.isArray(chapter.events) && chapter.events.some((chEvent) => chEvent.id === event.id);
    });
    const chapterIndex = chapters.indexOf(chapter)

    function findEventIndex(events, eventId) {
        for (let i = 0; i < events.length; i++) {
          if (events[i].id === eventId) {
            return i; 
          }
        }
        return -1; 
      }

      const eventIndex = findEventIndex(chapter.events, event.id);
console.log(eventIndex);
    function handleEditSwitch(){
        if(isEditing){
            
            
            event.name = nameRef.current.value
            event.sum = sumRef.current.value
            const newChapterevents = chapter.events
            newChapterevents[eventIndex]=  event
            const newChapters = [...chapters]
        newChapters[chapterIndex].events = newChapterevents 
        setChapters(newChapters)
            setEdit(!isEditing)
        }

        else{
        setEdit(!isEditing)
        }
    }

  

    const handleDelete = () => {
        const newChapterevents = chapter.events.filter(tempEvent => !(tempEvent.id === event.id))
        const newChapters = [...chapters]
        newChapters[chapterIndex].events = newChapterevents 
        setChapters(newChapters)
        navigate('../',{ state:{chapter}}); 
    };
    return (
        <div>
            <Link to={'../'} state={chapter} className='backBtn'> Go Back</Link>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
    <div>
    {!isEditing ? (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div>
      <div style={{ display: 'flex' }}>
        <p id='nameText'>{event.name}</p>
      </div>
      <div id='desc'>
        <p>{event.sum}</p>
      </div>
    </div>
  </div>
) : (
    <>
    <input type='text' ref={nameRef} defaultValue={event.name}></input>
    <textarea type='text' ref={sumRef} defaultValue={event.sum} id='discIn'></textarea>
    </>
)}
    <div id='btnWrapper'>
      <button className='btn' onClick={handleDelete}>Delete</button>
      <button className='btn' onClick={handleEditSwitch}>{isEditing? 'Save' : 'Edit'}</button>
      </div>
    </div>
    </div>
        </div>
    );
}
