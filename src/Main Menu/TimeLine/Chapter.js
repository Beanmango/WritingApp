import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Chapter.css' 

function Chapter({chapter}) {
    const [isHovered, setIsHovered] = useState(false);
    
    const handleMouseEnter = () => {
      setIsHovered(true);
    }
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    }

    const [backgroundText, setBackgroundText] = useState('');
    useEffect(() => {
      let newBackgroundText = 'linear-gradient(to bottom'
      let percent = 0
      let increment = null
      
  
      if(chapter.events && chapter.events.length > 0){
        increment = 100/chapter.events.length 
      for (let i = 0; i < chapter.events.length; i++) {
        newBackgroundText += `, ${chapter.events[i].color} ${percent}%`
        percent += increment
        newBackgroundText += `, ${chapter.events[i].color} ${percent}%`
      }
      newBackgroundText += ')'
        setBackgroundText(newBackgroundText)
        
      }
      else{setBackgroundText('yellow')}
      }, [chapter]);
      const divStyle = {
      
        background: backgroundText,
        position:'relative'
      };
    return (
      <div className='chapNotes'>
      <Link to={chapter.name} state={chapter}><div className='chapters'
      
      style={
        divStyle
      }
      
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
       {isHovered && (
  <div
    style={{
      background: 'rgba(0, 0, 0, 0.4)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}
  ></div>
)}
        <p style={{zIndex:100, maxHeight:100, width:80, minWidth:80}}>{isHovered ? chapter.name : ' '}</p>
        
      </div></Link>

      </div>
    );
  }
  
  export default Chapter;