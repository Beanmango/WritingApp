import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Event.css';

export default function Event({ event, changeEventPosition }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleDragOver = (e) =>{
    
    const x = e.clientX;

    changeEventPosition(event,x)
  }

 

  return (
<Link to={'./Edit'} state={event} className='events' draggable='true' style={{
  background: `radial-gradient(circle, ${event.brighterColor}, ${event.color})`,
  position: 'relative',
}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onDragEnd={handleDragOver}>
  {isHovered && (
    <div style={{
      background: 'rgba(0, 0, 0, 0.4)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}></div>
  )}
  <p style={{ zIndex: 100, maxHeight: 90, minWidth: 80, width:80 }}>{isHovered ? event.name : ' '}</p>
</Link>

  );
}
