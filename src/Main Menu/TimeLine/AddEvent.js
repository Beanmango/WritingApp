import React, { useRef, useState,useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './AddEvent.css'

export default function AddEvent({ chapters, setChapters }) {
  const eventNameRef = useRef();
  const eventSumRef = useRef('')
  const navigate = useNavigate();
  const location = useLocation();
  const chapter = location.state;
  const events = chapter.events ? chapter.events : [];
  const typeColor = useRef('')
  const typeName = useRef('')
  
  const [isAdding,setAdding] = useState(false)
  function openAdding(){
    setAdding(!isAdding)
  }

  const LOCATYPERKEY = 'eventTypes.types'
  const [eventTypes, setEventTypes] = useState([
    {
      id: "1",
      type: "Love",
      color: "#FF69B4",
      brighterColor: "#ff9be6"
  },
  {
      id: "2",
      type: "Action",
      color: "#FF0000",
      brighterColor: "#ff3232"
  },
  {
      id: "3",
      type: "Character Death",
      color: "#000000",
      brighterColor: "#323232"
  },
  {
      id: "4",
      type: "Revelation",
      color: "#B03CFF",
      brighterColor: "#e26eff"
  },
  {
      id: "5",
      type: "Conflict Resolution",
      color: "#00FF00",
      brighterColor: "#32ff32"
  },
  {
      id: "6",
      type: "Flashback",
      color: "#87CEEB",
      brighterColor: "#b9ffff"
  },
  {
      id: "7",
      type: "Comedic Relief",
      color: "#FFD700",
      brighterColor: "#ffff32"
  },
  {
      id: "8",
      type: "Betrayal",
      color: "#8B0000",
      brighterColor: "#bd3232"
  },
  {
      id: "9",
      type: "Character development",
      color: "#32CD32",
      brighterColor: "#64ff64"
  },
  {
      id: "10",
      type: "Mystery/Investigation",
      color: "#7B68EE",
      brighterColor: "#ad9aff"
  },
  {
      id: "11",
      type: "World Building",
      color: "#A0522D",
      brighterColor: "#d2845f"
  }
  ])  
  
  useEffect(() => {
    const storedTypes = JSON.parse(localStorage.getItem(LOCATYPERKEY))
    if (storedTypes) {setEventTypes(storedTypes)}
    }, [])
    useEffect(() => {
      localStorage.setItem(LOCATYPERKEY, JSON.stringify(eventTypes))
      }, [eventTypes])
      function hexColorToRgb(hex) {
        hex = hex.replace(/^#/, '');
      
    
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
    
        const newR = Math.min(r + 50, 255);
        const newG = Math.min(g + 50, 255);
        const newB = Math.min(b + 50, 255);
    
        const modifiedHex = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
      
        return modifiedHex;
      }
    
      function addNewType(){
        if(eventTypes.length === 18) {
          alert('please delete event types before adding more')
          return
        }
        const newTypes = [...eventTypes]
        const color = typeColor.current.value
        const brighterColor = hexColorToRgb(color)
        const typeToAdd = { type: typeName.current.value, color: color,brighterColor:brighterColor, id: uuidv4() }
        newTypes.push(typeToAdd)
        setEventTypes(newTypes)
        
    
      }
      function deleteType(type){
        const newTypes = eventTypes.filter(tempType => !(tempType.id === type.id))
        setEventTypes(newTypes)
      }
      

  const [selectedColor, setSelectedColor] = useState('')

  function handleColorChange(colorToChange) {
    if(colorToChange===selectedColor ){
      setSelectedColor('')
    }
    else{
      setSelectedColor(colorToChange)
    console.log(selectedColor)}
  }

  function handleAdd(e) {
    const eventName =eventNameRef.current.value
    if(selectedColor && eventName){
    const newChapters = [...chapters];
    for (let i = 0; i < chapters.length; i++) {
      if (newChapters[i].id === chapter.id) {
        const newEvents = [...events];
        newEvents.push({ name: eventName, id: uuidv4(), color: selectedColor.color, brighterColor:selectedColor.brighterColor, sum:eventSumRef.current.value});
        newChapters[i].events = newEvents;
        setChapters(newChapters);

        navigate('../', { state: { name: chapter.name, id: chapter.id, events: newEvents  } });
      }
    }}
    else return
  }

  return (
    <div >
            <Link to={'../'} state={chapter} className='backBtn'> Go Back</Link>
      <div style={{paddingLeft:'20px'}}>

      <p>Event Name</p>
      <input ref={eventNameRef} maxLength={50} type="text" />
      <p>Event Summary</p>
      <textarea ref={eventSumRef} type="text" id='discIn'> </textarea>
      <button onClick={handleAdd} className='btn'>Add Event</button>
      </div>

      <div id='TypeCon'>
        <div id='typesInnerCon'>
        {eventTypes.map(eventType => (
          <div
            key={eventType.id}
            onClick={() => handleColorChange(eventType)} 
            style={{
              cursor: 'pointer',
              height: 100,
              width: 30,

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            
              color: 'white',
              margin: 0
            }}
          >
            <div className="event-type"    style={selectedColor===eventType ? { backgroundColor:'#CAB596', borderRadius:'30px'} : {border: 'none',}}>
      <div
        className="event-circle"
        style={{ backgroundColor: eventType.color,  }}
      ></div>
      <span className="event-text">{eventType.type}</span>
      {selectedColor===eventType &&<button className='deleteButtonEvent'   onClick={() => deleteType(eventType)} > </button>}
    </div>
          </div>
        ))}
        

        </div>
        <div id='addingConEvent' >
          <div className='event-type' onClick={openAdding}>
            <div className="event-circle" style={{ backgroundColor: '#331803' }}></div>
            <span className="event-text">{isAdding ? 'Close' : 'Add Costume'}</span>
          </div>
          {isAdding && (
              <div className="additional-content">
                <p>Color</p>
                <input type='color' ref={typeColor} />
                <p>Relationship Type Name</p>
                <input type='text' maxLength={15} ref={typeName}  />
                <button className='btn' onClick={addNewType}>Add</button>
              </div>
            )}
          </div>
          </div>
          
    </div>
  );
};