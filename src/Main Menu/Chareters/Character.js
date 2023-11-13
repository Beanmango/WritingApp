import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Character({ character, handleUp,handleDown}) {
  const [isHovered, setIsHovered] = useState(false);
  const upButton = () => {
    handleUp(character)
  }
  const downButton = () =>{
    handleDown(character)
  }
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
      
        
      }}
      className='char'
    >
        <div style={{ opacity: isHovered ? 1 : 0 }}>
        <button onClick={upButton} className='CharArrowLeft'></button>
      </div>
    

       
      <Link to={character.name} state={character} className="character-link">
    
        <img src={character.image} className='charImg' />
        <label>{character.name}</label>
      </Link>
      <div style={{ opacity: isHovered ? 1 : 0 }}>
      <button onClick={downButton} className='CharArrowRight'></button>
      </div>
              
        

      
    </div>
  );
}
