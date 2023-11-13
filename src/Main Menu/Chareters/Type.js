import React from 'react';

export default function Type({ type,addType,linkType,deleteType }) {
    const isLinkType = type === linkType;
    function handleClick(){
        addType(type)
        
    }
    function handleDelete(){
        deleteType(type)
    }
  return (
    <div className="relationship-type" onClick={handleClick}    style={isLinkType ? { backgroundColor:'#CAB596', borderRadius:'30px'} : {border: 'none',}}>
      <div
        className="relationship-circle"
        style={{ backgroundColor: type.color }}
      ></div>
      <span className="relationship-text">{type.linkText}</span>
      {isLinkType &&<button className='deleteButton' onClick={handleDelete} style={{ position: 'relative', right: 0 }}> </button>}
    </div>
  );
}
