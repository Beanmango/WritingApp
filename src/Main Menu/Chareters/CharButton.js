import React, {useState} from 'react';

export default function Character({ CharButton,addToSelected,selected }) {
  const isSelected = selected.includes(CharButton);  
  function handleClick(){
    addToSelected(CharButton)
    
  }
  
  return (
    <div>
      <div  className="character-div">
    
    <img src={CharButton.image} className='charImg' onClick={handleClick } style={isSelected ? { border:'2px solid red',} : {border: 'none',}} />
    <p style={{color:'black'}}>{CharButton.name}</p>
  </div>
    </div>
  )
}