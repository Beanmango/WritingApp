import React from 'react'
import WBElement from './WBElement'

export default function WBElist({ myArray }) {
  return (
    myArray.map(element => {
      return <WBElement key={element.id} element={element} />
    })
  )
}