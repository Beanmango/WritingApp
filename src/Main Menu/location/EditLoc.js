import React from 'react'

export default function EditLoc({selected,locationNameRefEdit,locationDiscRefEdit,editHandle}) {
  return (
    <div>
      <p>Location Name</p>
            <input ref={locationNameRefEdit} type="text" defaultValue={selected.name}  />
            <p>Location Discription</p>
            <input ref={locationDiscRefEdit} type="text" defaultValue={selected.discription} />
            <button onClick={editHandle}>test</button>
    </div>
  )
}
