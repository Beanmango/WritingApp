import React from 'react'
export default function AddLocation({locationNameRef,locationDiscRef,handleAddLocation}) {
  return (
    <div>
            <p>Location Name</p>
            <input ref={locationNameRef} type="text" />
            <p>Location Discription</p>
            <input ref={locationDiscRef} type="text" />
            <button onClick={handleAddLocation}>test</button>
    </div>
  )
}
