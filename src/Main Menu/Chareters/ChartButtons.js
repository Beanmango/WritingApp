import React from 'react'
import CharButton from './CharButton'

export default function CharButtonList({ characters ,addToSelected,selected}) {
  return (
    characters.map(character => {
      return <CharButton key={character.id} CharButton={character} addToSelected={addToSelected} selected={selected} />
    })
  )
}