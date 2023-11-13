import React from 'react';
import './location.css'

export default function Location({ location, toggleLocation }) {
  function handleLocationClick() {
    toggleLocation(location.id)
  }

  return (
    <div>
      <label>
      
        <input type="checkbox" checked={location.complete} onChange={handleLocationClick} />
        {location.name}
      </label>
    </div>
  )
}