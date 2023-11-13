import React from 'react'
import { useLocation,Link,useNavigate } from 'react-router-dom'
import './ViewCharacter.css'

export default function ViewCharacter({ characters, setCharacters }) {
    const recieved = useLocation();
    const navigate = useNavigate();
    const character = recieved.state;
    function deleteCharacter(){
      const newCharacters = characters.filter(tempCharacter => !(tempCharacter.id === character.id))

      for(let i = 0; i< newCharacters.length; i++){
        for(let j = 0; j< newCharacters[i].linkedNodes.length; j++){
          console.log(newCharacters[i].linkedNodes)
          if(character.name === newCharacters[i].linkedNodes[j].name){
            newCharacters[i].linkedNodes.splice(j,1)
          }
        }
        
  
  }
  setCharacters(newCharacters)
      navigate('../')
    }
    
    return (
      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
    <div>
    <div style={{display:'flex'}}>
      {character.image && <img src={character.image}  style={{ maxWidth: '100px' }}  className='charImg'></img>}
      
      <p id='nameText'>{character.name}</p>
      </div>
    
    <div id='desc'>
      <p >{character.description}</p>
    </div>
    <div id='btnWrapper'>
      <Link to={'./Edit'} state={character} className='btn'>Edit</Link>
      <button onClick={deleteCharacter} className='btn'>Delete</button>
      </div>
    </div>
    </div>
  )
}
