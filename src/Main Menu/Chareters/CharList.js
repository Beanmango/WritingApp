import React from 'react'
import Character from './Character'

export default function CharacterList({ characters,handleUp,handleDown }) {
  return (
    characters.map(character => {
      return <Character key={character.id} character={character} handleUp={handleUp} handleDown={handleDown}/>
    })
  )
}