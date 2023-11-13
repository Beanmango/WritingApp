import React, { useState, useRef, useEffect } from 'react';
import LocationList from './LocationList'
import { v4 as uuidv4 } from 'uuid'
import MainMenu from '../MainMenu';
import ReactDOM from 'react-dom/client';
import AddLocation from './AddLocation';
import ViewLocation from './ViewLocation';
import EditLoc from './EditLoc';
let selected = null

export default function LocationMenu() {
    const LOCAL_STORAGE_KEY = 'locationMenu.locations'
    const [locations, setLocations] = useState([])
    const locationNameRef = useRef()
    const locationDiscRef = useRef()
    const locationNameRefEdit = useRef()
    const locationDiscRefEdit = useRef()
      useEffect(() => {
        const storedLocations = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedLocations) {setLocations(storedLocations)}
        }, [])
      
      useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locations))
        }, [locations])
     
        function toggleLocation(id) {
          const newLocations = [...locations]
          for(let i = 0; i<newLocations.length; i++){
            if(newLocations[i].id === id){
              newLocations[i].complete = !newLocations[i].complete
              if(newLocations[i].complete === true){selected = newLocations[i]
              console.log(selected)}
              else{
                selected = null
                console.log(selected)
              }
            }
            else{newLocations[i].complete = false}
          }
          setLocations(newLocations)
        }
      
        function handleAddLocation(e) {
          const discription = locationDiscRef.current.value  
          const name = locationNameRef.current.value
          if (name === '') return
          setLocations(prevLocations => {
            return [...prevLocations, { id: uuidv4(), name: name, complete: false, discription:discription}]
          })
          locationNameRef.current.value = null
          locationDiscRef.current.value = null
          setTimeout(function(){
            const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(<LocationMenu/>);
          }, 100)
        }
      
        function handleClearLocations() {
          const newLocations = locations.filter(location => !location.complete)
          setLocations(newLocations)
        }
        function returnToMainMenu(){
            
            const root = ReactDOM.createRoot(document.getElementById('root'))
            root.render(<MainMenu/>);
        }
        function editHandle() {
          const newLocations = [...locations]
          for(let i = 0; i<newLocations.length; i++){
            if(newLocations[i].id === selected.id){
              newLocations[i].name = locationNameRefEdit.current.value
              newLocations[i].discription =locationDiscRefEdit.current.value
              }
      
          setLocations(newLocations)
          setTimeout(function(){
            const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(<LocationMenu/>);
          }, 100)
        }}
        function goToEditLoc(){
          const root = ReactDOM.createRoot(document.getElementById('root'))
            root.render(<EditLoc selected={selected} locationNameRefEdit={locationNameRefEdit} locationDiscRefEdit={locationDiscRefEdit} editHandle={editHandle}/>)
        }
      


        function goToAddLoc(){
          const root = ReactDOM.createRoot(document.getElementById('root'))
            root.render(<AddLocation handleAddLocation={handleAddLocation} locationDiscRef={locationDiscRef} locationNameRef={locationNameRef}/>);
        }
        function goToViewLoc(){
          const root = ReactDOM.createRoot(document.getElementById('root'))
            root.render(<ViewLocation selected={selected} />)
        }

        return (    <>
          <LocationList locations={locations} toggleLocation={toggleLocation} />
          <button onClick={goToAddLoc}>Add Location</button>
          <button onClick={goToViewLoc}>View selected</button>
          <button onClick={goToEditLoc}>Edit selected</button>
          <button onClick={handleClearLocations}>Delete Selected</button>
          <button onClick={returnToMainMenu}>return</button>
        </>
      )}

