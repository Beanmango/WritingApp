import React from 'react'
import { Link } from 'react-router-dom'

export default function WBElement({element}) {
  return (
    <Link to={'./View'} state={element}>{element.name}</Link>
  )
}
