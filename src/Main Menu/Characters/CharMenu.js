import React from 'react';
import { Link } from 'react-router-dom';
import CharList from './CharList'
import './CharMenu.css'
export default function CharMenu({characters,setCharacters}) {
  function handleUp(character){
    const newCharacters = [...characters]
    for(let i=0;i<newCharacters.length;i++){
      if(character.id === newCharacters[i].id){
        if(i === 0){
          return
        }
        else{
          newCharacters[i-1] = characters[i]
          newCharacters[i] = characters[i-1]
          setCharacters(newCharacters)
          return
        }
      }
    }
  }
  function handleDown(character){
    const newCharacters = [...characters]
    for(let i=0;i<newCharacters.length -1;i++){
      if(character.id === newCharacters[i].id){
        if(i === newCharacters.length -1){
          return
        }
        else{
          newCharacters[i+1] = characters[i]
          newCharacters[i] = characters[i+1]
          setCharacters(newCharacters)
          return
        }
      }
    }
  }

        return (    
          <>
          <div id='charContainer'>
            <CharList characters={characters} handleUp={handleUp} handleDown={handleDown} />  
          </div>
          <Link to={'./add'} className='btn btnTxt' id='addCharBtn'>Add Character</Link>
          </>
      )
}
