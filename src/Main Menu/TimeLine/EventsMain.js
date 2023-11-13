import React, {useState,useEffect} from 'react'
import EventList from './EventList'
import './EventMain.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export default function EventsMain({chapters, setChapters}) {
  const location = useLocation();
  let chapter = location.state

  chapter = chapter.chapter ? chapter.chapter : chapter;
  
  console.log('Chapter:', chapter);
  const [events ,setEvents] = useState([...chapter.events])
  const [cooredinates, setCooredinates] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    const divs = document.getElementsByClassName('events')
    const newCoordinates = []
    for (const div of divs) {
      const rect = div.getBoundingClientRect();
      const coordinate = { left: rect.left, right: rect.right }
      newCoordinates.push(coordinate)
      
    }
    setCooredinates(newCoordinates)
  }, [events]);

  function handleDelete(){
    const newCharacters = chapters.filter(tempChapterr => !(tempChapterr.id === chapter.id))
    setChapters(newCharacters)
    navigate('../')
  }

  function updateEvents(newEvents){
    const newChapters = [...chapters]
    for(let i =0; i<newChapters.length  ; i++){
      if(chapter.id === newChapters[i].id){
        newChapters[i].events=newEvents
        setEvents(newEvents)
        setChapters(newChapters)
        chapter.events = newEvents
        return
      }
    }
  }
  function changeEventPosition(event, xDrop) {
    const index = events.indexOf(event);
    const newEvents = [...events];
  
    if (xDrop < cooredinates[0].left) {
      newEvents.splice(index, 1); 
      newEvents.unshift(event); 
      updateEvents(newEvents);
      return;
    } else if (xDrop > cooredinates[cooredinates.length - 1].left) {
      newEvents.splice(index, 1); 
      newEvents.push(event); 
      updateEvents(newEvents);
      return;
    } else {
      for (let i = 0; i < newEvents.length; i++) {
        if (i === index) {
          continue;
        }
        if (cooredinates[i].left < xDrop && cooredinates[i].right > xDrop) {
          newEvents[i] = events[index];
          newEvents[index] = events[i];
          updateEvents(newEvents);
          return;
        }
        if (i < newEvents.length - 1 && xDrop > cooredinates[i].right && xDrop < cooredinates[i + 1].left) {
          const element = newEvents[index];
          newEvents.splice(index, 1);
          if(index>i){newEvents.splice(i+1, 0, element)}
          else{newEvents.splice(i, 0, element)}
          updateEvents(newEvents);
          return;
        }
      }
    }
  }
  
  
  
     return (
      <>
      <p style={{fontSize:18}}>{chapter.name}</p>
    <div className='container'
    >
      <EventList events={events} chapterId={chapter.id}  changeEventPosition={changeEventPosition}></EventList>
    </div>
    <div style={{display:'flex' , flexDirection:'row'}}>
    {events.length < 30 && <Link to={'./AddEvent'} state={chapter} className='btn'>Add Event</Link>}
    <div className='btn' onClick={handleDelete}>Delete Chapter</div>
    </div>
    </>
  )
}
