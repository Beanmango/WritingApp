import React from 'react'
import ReactDOM from 'react-dom/client'
import LocationMenu from './LocationMenu'
function handleReturn(){
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(<LocationMenu/>)
}
export default function ViewLocation({selected,root}) {
  return (
    <div>
      <p>Name: {selected.name}</p> 
      <p>discription: {selected.discription}</p>
      <button onClick={handleReturn}>return</button>
    </div>
  )
}
